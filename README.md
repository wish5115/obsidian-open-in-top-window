# Obsidian Open in Top Window

[中文帮助](https://github.com/wish5115/obsidian-open-in-top-window/blob/main/README-zh.md)

# Introduction

The main function is that you can open the file in the top window, and the window can be customized in width, height, position, style and so on.

# Features

- Add "Open in Top Window" in context menu.

- New commands "Open current tab in top window" and "Move current tab to top window".

- New file open protocol, you can open the specified file in the top window by the protocol `obsidian://open-in-top-window?vault=demo&file=todo.md`.

- Customizable top window style.

# Installation

Go here to download [Open in top window](https://github.com/wish5115/obsidian-open-in-top-window/releases/)

After download, unzip obsidian-open-in-top-window.zip, put it into plugin directory, restart obsidian, and don't forget to open the plugin in settings.

You can also search and install the plugin in obsidian's plugin market. (Not yet available)


# Use

1. Right click menu to open, select "Open in top window".

2. Command to open, select "Open current tab in top window" or "Move current tab to top window".

3. Open by external link, through the protocol `obsidian://open-in-top-window?vault=demo&file=todo.md` to open the specified file in the top window.

4. api call：`app.plugins.plugins['open-in-top-window'].openInTopWindow(file, settings)`

# Screenshot

![](https://cdn.jsdelivr.net/gh/wish5115/obsidian-open-in-top-window@main/screenshots/en-menu.png)

![](https://cdn.jsdelivr.net/gh/wish5115/obsidian-open-in-top-window@main/screenshots/en-cmd.png)

![](https://cdn.jsdelivr.net/gh/wish5115/obsidian-open-in-top-window@main/screenshots/en-settings.png)


# Feedback

You can go to [issues](https://github.com/wish5115/obsidian-open-in-top-window/issues) to give feedback if you have any questions.


# Acknowledgments

This plugin is based on the replies of "熊猫别熬夜 噗~" to the posts [Can I create a new note in a new window](https://forum-zh.obsidian.md/t/topic/13004/5) and [About the top window program](https://forum-zh.obsidian.md/t/topic/32636/20).

For more information, see [About the top window Program](https://forum-zh.obsidian.md/t/topic/32636).

Thanks again "熊猫别熬夜 噗~" for your help and guidance!

