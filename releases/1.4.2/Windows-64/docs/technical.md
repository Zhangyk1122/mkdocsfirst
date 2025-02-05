**Git仓库数据过滤的大概流程**

git 本身提供了两个命令: `git-fast-export`, `git-fast-import`， 他们分别作用将Git仓库数据(.git/objects)导出为特定格式的元数据，流式读取这种特定格式的元数据，并生成一个完成的Git仓库。任何符合这种格式的文件，输入给git-fast-import都能创建一个Git仓库。

所以git-clean-repo的大致流程如下：

```
fast-export
    |
    | output stream
    |
    ---> parser(blob, commit, reset, tag...)
            |
            |
            |
            ---> filter(blob size, blob oid)
                    |
                    | input stream
                    |
                    ---> fast-import
```


**git fast-export 输出分析**


`$ git fast-export --all`

```bash
blob                                                            # 类型：blob
mark :1                                                         # 序号：1
data 11                                                         # 文件（大小）：11 bytes
"11111111"                                                      # 文件内容
                                                                # 换行 LF (必须单行)
reset refs/heads/main                                           # 表示当前分支(ref)为main
commit refs/heads/main                                          # 类型：commit
mark :2                                                         # 序号：2
author Li Linchao <lilinchao@oschina.cn> 1633749662 +0800       # author
committer Li Linchao <lilinchao@oschina.cn> 1633749662 +0800    # commiter
data 16                                                         # 数据（大小）：16
第一个commit                                                     # commit message(header, body)
M 100644 :1 README.md                                           # filechang: M(modify), D(delete), :1表示该commit修改了序号1中的文件
                                                                # 换行
blob
mark :3
data 33
CopyRight@2021
Author: lilinchao

commit refs/heads/main
mark :4
author Li Linchao <lilinchao@oschina.cn> 1633749750 +0800
committer Li Linchao <lilinchao@oschina.cn> 1633749750 +0800
data 21
add new LICENSE file
from :2                                                         # 表示该commit的parent是序号为2的commit
M 100644 :3 LICENSE                                             # 表示对序号3中的文件LICENSE进行了修改

blob
mark :5
data 22
"11111111"
"22222222"

commit refs/heads/main
mark :6
author Li Linchao <lilinchao@oschina.cn> 1633749780 +0800
committer Li Linchao <lilinchao@oschina.cn> 1633749780 +0800
data 21
修改 README 文件
from :4
M 100644 :5 README.md

reset refs/remotes/origin/main                                 # 表示远程分支为main
from :6                                                        # 表示远程分支的commit对应本地序号6的commit
```
> 测试仓库: https://gitee.com/cactusinhand/fast-export-test.git



**部分选项说明**

**--show-original-ids** 选项 会在输出中加入original-oid <SHA1SUM>`指令`, 这个对于重写commit历史，或者通过ID裁剪blob有帮助

**--reencode=(yes|no|abort)** 选项 用于处理commit信息中的编码问题， yes表示将commit message重新编码为UTF-8


---
tag的处理情况有点特殊：

对于轻量级tag，相当于只是一个引用，在这里即是`reset`, 在仓库中首次加入tag时的变化是：
```diff
diff --git a/tmp b/tmp
index 4100964..d9ffcc7 100644
--- a/tmp
+++ b/tmp
@@ -12,3 +12,6 @@ data 11
 add file a
 M 100644 :1 a.txt

+reset refs/tags/v1.0.a
+from :2
+
(END)
```


同时`reset`是一段commit范围内的基准，reset会重置commit所在的引用。

如果一个commit没有parent，则会在它前面加上reset字段, 该reset即为当前分支名


对于标注型tag， 则会在输入流的最后加上tag的详细信息，类似于commit：
```diff
diff --git a/tag.txt b/tag.txt
index e06b3ce..46f05fa 100644
--- a/tag.txt
+++ b/tag.txt
@@ -45,3 +45,9 @@ M 100644 :5 README.md
 reset refs/remotes/origin/main
 from :6
                                                              # LF
+tag v1.1                                                     # tag name
+from :6                                                      # tag from mark_6
+tagger Li Linchao <lilinchao@oschina.cn> 1633761415 +0800    # tagger
+data 10                                                      # tag size
+noted tag                                                    # tag message
+
(END)
```

> 如果要对tag进行序号标记，则需要加上`--mark-tags`选项。


---

fast-export输出流中，commit类型数据包含的字段：

+ commit
+ mark
+ author
+ commiter
+ encoding(*)
+ from
+ merge
+ filechange
+ original-oid
+ deleteall(*)


如果想删除某个文件(blob)以及其涉及的提交(commit)，对输出流的改动如下：

```diff
diff --git a/all.txt b/all.txt
index e4a9cba..2bd2161 100644
--- a/all.txt
+++ b/all.txt
@@ -1,47 +1,17 @@
 blob
 mark :1
-data 11
-"11111111"
-
-reset refs/heads/main
-commit refs/heads/main
-mark :2
-author Li Linchao <lilinchao@oschina.cn> 1633749662 +0800
-committer Li Linchao <lilinchao@oschina.cn> 1633749662 +0800
-data 16
-第一个commit
-M 100644 :1 README.md
-
-blob
-mark :3
 data 33
 CopyRight@2021
 Author: lilinchao

+reset refs/heads/main
 commit refs/heads/main
-mark :4
+mark :2
 author Li Linchao <lilinchao@oschina.cn> 1633749750 +0800
 committer Li Linchao <lilinchao@oschina.cn> 1633749750 +0800
 data 21
 add new LICENSE file
-from :2
-M 100644 :3 LICENSE
-
-blob
-mark :5
-data 22
-"11111111"
-"22222222"
-
-commit refs/heads/main
-mark :6
-author Li Linchao <lilinchao@oschina.cn> 1633749780 +0800
-committer Li Linchao <lilinchao@oschina.cn> 1633749780 +0800
-data 21
-修改 README 文件
-from :4
-M 100644 :5 README.md
+M 100644 :1 LICENSE

 reset refs/remotes/origin/main
-from :6
+from :2

(END)
```

完整数据如下：
```bash
blob
mark :1
data 33
CopyRight@2021
Author: lilinchao

reset refs/heads/main
commit refs/heads/main
mark :2
author Li Linchao <lilinchao@oschina.cn> 1633749750 +0800
committer Li Linchao <lilinchao@oschina.cn> 1633749750 +0800
data 21
add new LICENSE file
M 100644 :1 LICENSE

reset refs/remotes/origin/main
from :2
```

最后，将该文件作为输入流，传递给fast-import则可以得到一个新的完整的仓库，里面不包含前面删除的文件
```bash
$ git init new-repo
$ cd new-repo
$ git fast-import <../output
$ git reset --hard
```

解析过程就是逐行读取数据流，并识别出不同的数据类型，该过程伴随着数据格式检验
过滤过程就是删除指定的blob，以及对应的commit，并且更新所有的mark序号(否则fast-import解析出错，达不到预期的效果)。

通过使用`--show-original-ids`选项，可以得到所有对象的oid, 然后可以进行过滤。


**NOTE**

+ Blob, Commit, Reset, Tag, Filechange类型数据，底层都嵌套有`GitElements`结构，其中有`dumped`这个字段，
一旦检测到改字段为`false`，则意味着改类型需要被过滤，整条数据不再写入流中，同时直接跳到下一行继续解析其它类型数据。

+ 只有要dump到输入流中时的mark ID才是实际顺序的ID，所以可以在实际dump时才NewID(),否则始终记录的是原始顺序ID。

+ 需要使用 `git -c core.quotepath`配置处理文件名：
```bash
# git -c core.quotepath true
M 100644 :1 "Name and a\nLF"
M 100644 :1 "Name and an\tHT"
M 100644 :1 "Name\""
M 100644 :1 Name
M 100644 :1 "With SP in it"
M 100644 :1 "\346\277\261\351\207\216\t\347\264\224"
M 100644 :1 "\346\277\261\351\207\216\n\347\264\224"
M 100644 :1 "\346\277\261\351\207\216 \347\264\224"
M 100644 :1 "\346\277\261\351\207\216\"\347\264\224"
M 100644 :1 "\346\277\261\351\207\216/file"
M 100644 :1 "\346\277\261\351\207\216\347\264\224"
```

```bash
# git -c core.quotepath false
M 100644 :1 "Name and a\nLF"
M 100644 :1 "Name and an\tHT"
M 100644 :1 "Name\""
M 100644 :1 Name
M 100644 :1 "With SP in it"
M 100644 :1 "濱野\t純"
M 100644 :1 "濱野\n純"
M 100644 :1 "濱野 純"
M 100644 :1 "濱野\"純"
M 100644 :1 濱野/file
M 100644 :1 濱野純
```

+ 对于FileChange的类型说明：
```bash
reset refs/heads/main
commit refs/heads/main
mark :2
author A U Thor <author@example.com> 1112912773 -0700
committer C O Mitter <committer@example.com> 1112912773 -0700
data 9
addition
M 100644 :1 "path with\nnewline"
M 100644 :1 "path with \"quote\""
M 100644 :1 "path with \\backslash"
M 100644 :1 "path with space"

commit refs/heads/main
mark :3
author A U Thor <author@example.com> 1112912773 -0700
committer C O Mitter <committer@example.com> 1112912773 -0700
data 7
rename
from :2
R "path with\nnewline" "subdir/path with\nnewline"
R "path with \"quote\"" "subdir/path with \"quote\""
R "path with \\backslash" "subdir/path with \\backslash"
R "path with space" "subdir/path with space"

commit refs/heads/main
mark :4
author A U Thor <author@example.com> 1112912773 -0700
committer C O Mitter <committer@example.com> 1112912773 -0700
data 9
deletion
from :3
D "subdir/path with\nnewline"
D "subdir/path with \"quote\""
D "subdir/path with \\backslash"
D "subdir/path with space"
```
上面出现了三种类型，对应了三种文件的操作:
> + 增加文件，格式为：M fileType id path
> + 重命名文件, 格式为: R oldpath newpath
> + 删除文件，格式为：D file path

Git中实际上还有A(Added),C(Copied)等等，但是在这里都不考虑。因为M,R,D组合就能够实现A,C所代表的意思。[参考](https://git-scm.com/docs/git-fast-export#Documentation/git-fast-export.txt--M)


+ 对于commit的一些说明

```bash
#提交的commit如下：
commit aa06fdf165058a1348892834554325831e00ec74
Author: Li Linchao <lilinchao@oschina.cn>
Date:   Thu Apr 15 20:59:43 2021 +0800

    Create t.txt
    from :45
    from :42

# 生成的metadata如下：
commit refs/heads/master
mark :41
original-oid aa06fdf165058a1348892834554325831e00ec74
author Li Linchao <lilinchao@oschina.cn> 1618491583 +0800
committer GitHub <noreply@github.com> 1618491583 +0800
data 30
Create t.txt
from :45
from :42from :40
M 100644 :39 dir/t.txt
```

实际应该解析的数据是：
Create t.txt LF
from :45 LF
from :42
大小为30

最后应该插入一个LF换行，否则影响下一行读取的内容。

以上情况已经能够识别和处理，但是在这种情况下还有一种更特殊的情况，即第一个commit就带有这个特殊的message，同时，修改文件为0。
即：这种特殊情况就是，commit data 之后，既没有parents(from, merge)，也没有filechanges，同时commit message包含伪filechanges信息。
以上情况需要特殊处理。