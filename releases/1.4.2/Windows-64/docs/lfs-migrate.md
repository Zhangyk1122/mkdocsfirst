1. run git-fast-export without '--no-data' option
2. parse blob
3. if get target file(by name, id, size), perform `replace` process.
4. dump new file(blob) into git-fast-import


**replace process:**

```bash

git fast-export
      |
      |
      V
------------
| old blob |
|----------|
      |
      |
      |---->    + sha256   ---> .git/lfs/objects
                + sha1
                + size
                + name
--------------------------------------------------
        original-oid $(new sha1)
        data $(new size)
        version https://git-lfs.github.com/spec/v1
        oid sha256:$(sha256)
        size $(old size)
                    |
                    | construct new blob
                    V
               ------------
               | new blob |
               |----------|
                    |
                    | dump(replace old blob)
                    V
            git fast-import

```

**NOTE**
<!-- This feature may need be authorized by Gitee.com -->

Git LFS Specification: https://github.com/git-lfs/git-lfs/blob/5eb9bb01/docs/spec.md

`new sha1` is hash of this content:
```
        version https://git-lfs.github.com/spec/v1
        oid sha256:$(sha256)
        size $(old size)
```

`new size` is this content's size

sha256:
SHA-256 signature of the file's contents

The pointer file should be small, that less than 200 bytes