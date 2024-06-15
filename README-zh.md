# 介绍

主要功能是可以在置顶窗口中打开文件，窗口可以自定义宽高，位置，样式等。

# 特色

- 右键菜单中新增在置顶窗口中打开。

- 新增命令”在置顶窗口中打开当前文件“和”移动当前文件到置顶窗口“中。

- 新增文件打开协议，可以通过协议`obsidian://open-in-top-window?vault=demo&file=todo.md`在置顶窗口中打开指定文件。

- 可自定义置顶窗口样式。

# 安装

到这里下载 [Open in top window](https://github.com/wish5115/obsidian-open-in-top-window/releases/)

下载后把 obsidian-open-in-top-window.zip 解压，放到插件目录，重启 obsidian，然后别忘了到设置里开启插件即可。

亦可在obsidian的插件市场中搜索安装。（暂未上架）


# 使用

1. 右键菜单打开，选择在置顶窗口中打开即可。

2. 命令打开，选择”在置顶窗口中打开当前文件“或”移动当前文件到置顶窗口中“命令打开即可。

3. 外部链接打开，通过协议`obsidian://open-in-top-window?vault=demo&file=todo.md`在置顶窗口中打开指定文件，具体参数可参考[main.js#L249](https://github.com/wish5115/obsidian-open-in-top-window/blob/49d8719153b2c55c6acd86fd6ce3e0fb36d89055/main.js#L249)

4. api调用：`app.plugins.plugins['open-in-top-window'].openInTopWindow(file, settings)`，具体参数可参考[main.js#L70](https://github.com/wish5115/obsidian-open-in-top-window/blob/49d8719153b2c55c6acd86fd6ce3e0fb36d89055/main.js#L70)

# 截图

![](https://cdn.jsdelivr.net/gh/wish5115/obsidian-open-in-top-window@main/screenshots/zh-menu.png)

![](https://cdn.jsdelivr.net/gh/wish5115/obsidian-open-in-top-window@main/screenshots/zh-cmd.png)

![](https://cdn.jsdelivr.net/gh/wish5115/obsidian-open-in-top-window@main/screenshots/zh-open-link.png)

![](https://cdn.jsdelivr.net/gh/wish5115/obsidian-open-in-top-window@main/screenshots/zh-settings.png)


# 反馈

您有任何问题都可以到 [issues](https://github.com/wish5115/obsidian-open-in-top-window/issues) 去反馈。


# 鸣谢

该插件根据”熊猫别熬夜 噗~“的回复帖子[能否以新窗口的形式新建笔记](https://forum-zh.obsidian.md/t/topic/13004/5)和[关于笔记屏幕置顶方案](https://forum-zh.obsidian.md/t/topic/32636/20)整理而来。

详情参见：[关于笔记屏幕置顶方案](https://forum-zh.obsidian.md/t/topic/32636)

再次感谢 熊猫别熬夜 噗~ 的帮助和指导！
