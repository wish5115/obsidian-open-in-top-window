const { Plugin, PluginSettingTab, Setting } = require('obsidian');

///////////////////////////////// 多语言 ///////////////////////////////////
// 默认为中文
const langMap = {
	"en": {
    //settings
		"isAlwaysOnTop": "Keep the window on top",
		"isAlwaysOnTopDesc": "After closing, the opened top window will no longer be top of the screen.",
    "defaultWindowSize": "Default window size",
    "defaultWindowSizeDesc": "The width and height of the default window, empty or 0 uses the obsidian default new window size.",
    "defaultWindowPos": "Default window position",
    "defaultWindowPosDesc": "The distance of the default top window from the left or top of the screen, empty or 0 uses the obsidian default position, centered.",
    "hideTabHeader": "Hide tabs navigation in the header",
    "hideTabHeaderDesc": "When hidden, the space it occupies is also occupied by the following elements.",
    "hideTitle": "Hide the article title",
    "hideTitleDesc": "Will hide the space occupied by the article title, after hiding it can also be used to rename the title via the file menu.",
    "hideNav": "Hide the navigation bar",
    "hideNavDesc": "This navigation bar is the toolbar above the article title and below the tabs.",
    "hideNavToolbar": "Hide the toolbar of the navigation bar",
    "hideNavToolbarDesc": "Will hide the history button on the left side of the navigation bar and the tool buttons on the right side, including buttons added via cmdr, etc.",
    "rememberLastPosition": "Remember last window position",
    "rememberLastPositionDesc": "This position includes the width of the window and the distance of the window from the left side and the top, note that this position is captured by the mouse move event inside window.",
    "customStyle": "User-defined window style",
    "customStyleDesc": "You can customize the style of the top window with this input box, just write the css style directly, no need to add <style> tag.",
    //plugin
    "Open current tab in top window": "Open current tab in top window",
    "Move current tab to top window": "Move current tab to top window",
    "Open in top window": "Open in top window",
	},
  "zh-cn": {
    "isAlwaysOnTop": "保持窗口置顶",
		"isAlwaysOnTopDesc": "关闭后，打开的置顶窗口将不再屏幕置顶。",
    "defaultWindowSize": "默认窗口大小",
    "defaultWindowSizeDesc": "默认窗口的宽高，为空或0则使用obsidian默认的新窗口大小。",
    "defaultWindowPos": "默认窗口位置",
    "defaultWindowPosDesc": "默认置顶窗口距屏幕左侧或顶部的距离，为空或0则使用obsidian默认的位置，居中显示。",
    "hideTabHeader": "隐藏头部标签页导航栏",
    "hideTabHeaderDesc": "隐藏后，其占用的空间也会被下面的元素占据。",
    "hideTitle": "隐藏文章标题",
    "hideTitleDesc": "将会隐藏文章标题占据的空间，隐藏后也可以通过文件菜单进行重名标题等。",
    "hideNav": "隐藏导航栏",
    "hideNavDesc": "这个导航栏是指文章标题上面，标签页下面的那个工具栏。",
    "hideNavToolbar": "隐藏导航栏的工具栏",
    "hideNavToolbarDesc": "将会隐藏导航栏左侧的历史按钮和右侧的工具按钮，包括通过cmdr添加的按钮等。",
    "rememberLastPosition": "记住上次窗口位置",
    "rememberLastPositionDesc": "这个位置包括窗口宽度和窗口距离左侧和顶部的距离，注意，这个位置是通过鼠标在窗口内的移动事件捕获的。",
    "customStyle": "用户自定义窗口样式",
    "customStyleDesc": "你可以通过该输入框自定义置顶窗口的样式，直接写css样式即可，不需要加<style>标签。",
    //plugin
    "Open current tab in top window": "在置顶窗口中打开当前文件",
    "Move current tab to top window": "移动当前文件到置顶窗口中",
    "Open in top window": "在置顶窗口中打开",
	},
}
function t(str) {
    const lang = moment.locale();
    if(langMap[lang] && langMap[lang][str]) {
        return langMap[lang][str];
    }
    if(langMap["en"] && langMap["en"][str]) {
      return langMap["en"][str];
    }
    return str;
}

///////////////////////////////// 插件配置 ///////////////////////////////////

// 设置默认值
const DEFAULT_SETTINGS = {
  isAlwaysOnTop: true,
  width: 380,
  height: 500,
  x: 0,
  y: 0,
  hideTabHeader: true,
  hideTitle: true,
  hideNav: false,
  hideNavToolbar: false,
  rememberLastPosition: false,
  lastPosition: {},
  customStyle: '',
};

// 设置面板
const TopWindowOpenSettingTab = class extends PluginSettingTab {
  constructor(app, plugin) {
      super(app, plugin);
      this.plugin = plugin;
  }
  display() {
      const { containerEl } = this;
      containerEl.empty();

      // 窗口置顶
      new Setting(containerEl).setName(t("isAlwaysOnTop"))
      .setDesc(t("isAlwaysOnTopDesc"))
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.isAlwaysOnTop)
        .onChange(async (value) => {
          this.plugin.settings.isAlwaysOnTop = value;
          await this.plugin.saveSettings();
        });
      });

      // 默认窗口大小
			const windowSizeControlEl = new Setting(containerEl)
			.setName(t("defaultWindowSize"))
			.setDesc(t("defaultWindowSizeDesc"))
      .setClass("window-size")
      .controlEl;
			const windowWidth = windowSizeControlEl.createEl("input", { attr: { type: "number", value: Number(this.plugin.settings.width), placeholder: "width" } });
			windowWidth.onchange = () => {
				this.plugin.settings.width = Number(windowWidth.value);
				this.plugin.saveSettings();
			}
			windowSizeControlEl.createSpan({text: "×"});
			const windowHeight = windowSizeControlEl.createEl("input", { attr: { type: "number", value: Number(this.plugin.settings.height), placeholder: "height" } });
			windowHeight.onchange = () => {
				this.plugin.settings.height = Number(windowHeight.value);
				this.plugin.saveSettings();
			}

			// 默认窗口位置
			const windowPosControlEl = new Setting(containerEl)
			.setName(t("defaultWindowPos"))
			.setDesc(t("defaultWindowPosDesc"))
      .setClass("window-pos")
      .controlEl;
			const windowPosX = windowPosControlEl.createEl("input", { attr: { type: "number", value: Number(this.plugin.settings.x), placeholder: "x" } });
			windowPosX.onchange = () => {
				this.plugin.settings.x = Number(windowPosX.value);
				this.plugin.saveSettings();
			}
			windowPosControlEl.createSpan({text: "×"});
			const windowPosY = windowPosControlEl.createEl("input", { attr: { type: "number", value: Number(this.plugin.settings.y), placeholder: "y" } });
			windowPosY.onchange = () => {
				this.plugin.settings.y = Number(windowPosY.value);
				this.plugin.saveSettings();
			}

      //隐藏头部标签
      new Setting(containerEl).setName(t("hideTabHeader"))
      .setDesc(t("hideTabHeaderDesc"))
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.hideTabHeader)
        .onChange(async (value) => {
          this.plugin.settings.hideTabHeader = value;
          await this.plugin.saveSettings();
        });
      });

      // 隐藏标题栏
      new Setting(containerEl).setName(t("hideTitle"))
      .setDesc(t("hideTitleDesc"))
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.hideTitle)
        .onChange(async (value) => {
          this.plugin.settings.hideTitle = value;
          await this.plugin.saveSettings();
        });
      });

      // 隐藏导航栏
      new Setting(containerEl).setName(t("hideNav"))
      .setDesc(t("hideNavDesc"))
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.hideNav)
        .onChange(async (value) => {
          this.plugin.settings.hideNav = value;
          await this.plugin.saveSettings();
        });
      });

      //隐藏头导航的工具栏
      new Setting(containerEl).setName(t("hideNavToolbar"))
      .setDesc(t("hideNavToolbarDesc"))
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.hideNavToolbar)
        .onChange(async (value) => {
          this.plugin.settings.hideNavToolbar = value;
          await this.plugin.saveSettings();
        });
      });

      // 记住上次窗口大小和位置
      new Setting(containerEl).setName(t("rememberLastPosition"))
      .setDesc(t("rememberLastPositionDesc"))
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.rememberLastPosition)
        .onChange(async (value) => {
          this.plugin.settings.rememberLastPosition = value;
          await this.plugin.saveSettings();
        });
      });

      //自定义置顶窗口css样式
      new Setting(containerEl).setName(t("customStyle"))
      .setDesc(t("customStyleDesc"))
      .setClass("custom-style")
      .addTextArea((textArea) => {
        textArea.setValue(this.plugin.settings.customStyle)
          .onChange(async (value) => {
            this.plugin.settings.customStyle = value;
            await this.plugin.saveSettings();
          });
      });
  }
}

///////////////////////////////// 插件主体 ///////////////////////////////////

module.exports = class extends Plugin {
  async onload() {
    // 加载配置文件
    await this.loadSettings();

    // 注册打开当前文档到置顶窗口命令
    this.addCommand({
			id: "open-in-top-window",
			name: t("Open current tab in top window"),
			callback: () => {
				this.openLeafInTopWindow(this.app.workspace.activeLeaf);
			},
		});
    // 注册移动当前文档到置顶窗口命令
    this.addCommand({
			id: "move-to-top-window",
			name: t("Move current tab to top window"),
			callback: () => {
				this.moveLeafToTopWindow(this.app.workspace.activeLeaf);
			},
		});

    // 注册右键菜单
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        menu.addItem((item) => {
          item.setTitle(t("Open in top window"))
            .setIcon("maximize")
            .onClick(async () => {
              this.openInTopWindow(file);
            });
        });
      })
    );

    // 注册文件打开协议
    // obsidian://open-in-top-window?vault=demo&file=todo.md&always-on-top=true&width=380&height=500&hide-tab-header=true&hide-title&...
    this.registerObsidianProtocolHandler('open-in-top-window', async (url)=> {
      if (url.action != 'open-in-top-window' || !url.file) return;
      let settings = this.settings;
      // 舒适化参数
      if(url['always-on-top']!==undefined) settings.isAlwaysOnTop = url['always-on-top'] !== 'false'; //默认true
      if(url['width']!==undefined) settings.width = Number(url['width']) || this.settings.width || 380;
      if(url['height']!==undefined) settings.height = Number(url['height']) || this.settings.height || 500;
      if(url['x']!==undefined) settings.x = Number(url['x']) || this.settings.x || 0;
      if(url['y']!==undefined) settings.y = Number(url['y']) || this.settings.y || 0;
      if(url['hide-tab-header']!==undefined) settings.hideTabHeader = url['hide-tab-header'] !== 'false'; //默认true
      if(url['hide-title']!==undefined) settings.hideTitle = url['hide-title'] !== 'false'; //默认true
      if(url['hide-nav']!==undefined) settings.hideNav = url['hide-nav'] === 'true'; //默认false
      if(url['hide-nav-toolbar']!==undefined) settings.hideNavToolbar = url['hide-nav-toolbar'] === 'true'; //默认false
      if(url['remember-last-position']!==undefined) settings.rememberLastPosition = url['remember-last-position'] === 'true'; //默认false
      if(url['last-position']!==undefined) settings.lastPosition = JSON.parse(url['last-position']||'{}') || this.settings.lastPosition;
      if(url['custom-style']!==undefined) settings.customStyle = url['custom-style'] || this.settings.customStyle;

      this.openInTopWindow(url.file, settings);
    });

    // 添加配置面板
    this.addSettingTab(new TopWindowOpenSettingTab(this.app, this));
  }
  onunload() {}

  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      await this.loadData()
    );
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }

  // 打开当前文档到置顶窗口
  async openLeafInTopWindow(leaf, customSettings = {}) {
    if(!leaf?.view?.file?.path) return;
    this.openInTopWindow(leaf?.view?.file?.path, customSettings);
  }

  // 移动当前文档到置顶窗口
  async moveLeafToTopWindow(leaf, customSettings = {}) {
    if(!leaf?.view?.file?.path) return;
    await this.openInTopWindow(leaf?.view?.file?.path, customSettings);
    leaf.detach();
  }

  // 在置顶新窗口打开
  async openInTopWindow(file, customSettings = {}) {
    if(typeof file === 'string') {
      file = this?.app?.metadataCache?.getFirstLinkpathDest(file, file);
    }
    if(!file) return;
    // 获取配置，并把转换字符串为数字格式
    let settings = this.settings;
    settings.width = Number(settings.width);
    settings.height = Number(settings.height);
    settings.x = Number(settings.x);
    settings.y = Number(settings.y);
    // 窗口宽高
    let state = {width: settings.width||380, height: settings.height||500};
    if (settings.x > 0 && settings.y > 0) {
      state = {...state, x: settings.x, y: settings.y}
    }
    // 上次窗口位置
    if(settings.rememberLastPosition && Object.keys(settings.lastPosition).length > 0) {
      state = {...state, ...settings.lastPosition};
    }
    // 合并用户参数
    settings = {...settings, ...customSettings};

    // 打开置顶窗口
    await this.app.workspace.openPopoutLeaf(state).openFile(file);
    if(settings.isAlwaysOnTop) activeWindow.electronWindow.setAlwaysOnTop(true);

    // 窗口加载完成后执行
    const setWindowStyle = (activeWindow) => {
      const container = activeWindow.document.querySelector('.app-container');
      // add class to container element
      container.classList.add("open-in-top-window");

      // 隐藏标题
      if(settings.hideTitle) {
        container.classList.add("hide-title");
      }
      // 隐藏导航
      if(settings.hideNav){
        container.classList.add("hide-nav");
      }
      // 隐藏tab
      if(settings.hideNavToolbar){
        container.classList.add("hide-nav-toolbar");
      }
      // 隐藏tab-header
      if(settings.hideTabHeader){
        container.classList.add("hide-tab-header");
        container.classList.add("nav-draggable");
      }
      // 用户自定义样式
      if(settings.customStyle){
        const userStyle = activeWindow.document.head.querySelector("#open-in-top-window-style");
        if(userStyle) userStyle.remove();
        activeWindow.document.head.appendChild(
          createEl("style", {
            attr: { id: "open-in-top-window-style" },
            text: settings.customStyle,
            type: "text/css",
          })
        );
      }
    };
    //监听窗口大小变化，防止全屏后置顶失效
    const addResizeListener = function(activeWindow) {
      let resizeTimer;
      activeWindow.addEventListener('resize', function(event) {
        if(resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            try {
              if(activeWindow && activeWindow?.electronWindow && activeWindow?.electronWindow?.setAlwaysOnTop) {
                if(settings.isAlwaysOnTop) activeWindow?.electronWindow?.setAlwaysOnTop(true);
              }
            } catch (error) {
              console.log(error);
            }
          }, 100);
      });
    }
    // 监听鼠标移入事件，用来记录上次窗口信息
    const addMouseoverListener = (activeWindow, saveSettings) => {
      let mouseoverTimer;
      activeWindow.addEventListener('mouseover', (event) => {
        if(mouseoverTimer) clearTimeout(mouseoverTimer);
        mouseoverTimer = setTimeout(() => {
            let isChanged = false;
            if(!settings.lastPosition) settings.lastPosition = {};
            if(settings.lastPosition.width !== activeWindow.outerWidth) {
              settings.lastPosition.width = activeWindow.outerWidth;
              isChanged = true;
            }
            if(settings.lastPosition.height !== activeWindow.outerHeight) {
              settings.lastPosition.height = activeWindow.outerHeight;
              isChanged = true;
            }
            if(settings.lastPosition.x !== activeWindow.screenX) {
              settings.lastPosition.x = activeWindow.screenX;
              isChanged = true;
            }
            if(settings.lastPosition.y !== activeWindow.screenY) {
              settings.lastPosition.y = activeWindow.screenY;
              isChanged = true;
            }
            if(isChanged){
              if(settings.lastPosition.width === 0 && settings.lastPosition.height === 0
                && settings.lastPosition.x === 0 && settings.lastPosition.y === 0
              ){
                return;
              }
              saveSettings(settings);
            }
          }, 100);
      });
    };
    // 保存上次窗口位置
    const saveSettings = (settings) => {
      this.settings = {...this.settings, ...settings}
      this.saveSettings();
    }
    // 窗口加载完成后执行
    activeWindow.ready(async () => {
      setWindowStyle(activeWindow);
      addResizeListener(activeWindow);
      addMouseoverListener(activeWindow, saveSettings);
    });
  }
}