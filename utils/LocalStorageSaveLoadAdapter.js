const storageKeys = {
  charts: "LocalStorageSaveLoadAdapter_charts",
  studyTemplates: "LocalStorageSaveLoadAdapter_studyTemplates",
  drawingTemplates: "LocalStorageSaveLoadAdapter_drawingTemplates",
  chartTemplates: "LocalStorageSaveLoadAdapter_chartTemplates",
  drawings: "LocalStorageSaveLoadAdapter_drawings",
};

export default class LocalStorageSaveLoadAdapter {
  constructor() {
    this._charts = this._getFromLocalStorage(storageKeys.charts) || [];
    this._studyTemplates =
      this._getFromLocalStorage(storageKeys.studyTemplates) || [];
    this._drawingTemplates =
      this._getFromLocalStorage(storageKeys.drawingTemplates) || [];
    this._chartTemplates =
      this._getFromLocalStorage(storageKeys.chartTemplates) || [];
    this._drawings = this._getFromLocalStorage(storageKeys.drawings) || {};
    this._isDirty = false;

    setInterval(() => {
      if (this._isDirty) {
        this._saveAllToLocalStorage();
        this._isDirty = false;
      }
    }, 1000);
  }

  getAllCharts() {
    return Promise.resolve(this._charts);
  }

  removeChart(id) {
    for (let i = 0; i < this._charts.length; ++i) {
      if (this._charts[i].id === id) {
        this._charts.splice(i, 1);
        this._isDirty = true;
        return Promise.resolve();
      }
    }
    return Promise.reject(new Error("The chart does not exist"));
  }

  saveChart(chartData) {
    if (!chartData.id) {
      chartData.id = this._generateUniqueChartId();
    } else {
      this.removeChart(chartData.id);
    }

    const savedChartData = {
      ...chartData,
      id: chartData.id,
      timestamp: Math.round(Date.now() / 1000),
    };
    this._charts.push(savedChartData);
    this._isDirty = true;
    return Promise.resolve(savedChartData.id);
  }

  getChartContent(id) {
    for (let i = 0; i < this._charts.length; ++i) {
      if (this._charts[i].id === id) {
        return Promise.resolve(this._charts[i].content);
      }
    }
    return Promise.reject(new Error("The chart does not exist"));
  }

  removeStudyTemplate(studyTemplateData) {
    for (let i = 0; i < this._studyTemplates.length; ++i) {
      if (this._studyTemplates[i].name === studyTemplateData.name) {
        this._studyTemplates.splice(i, 1);
        this._isDirty = true;
        return Promise.resolve();
      }
    }
    return Promise.reject(new Error("The study template does not exist"));
  }

  getStudyTemplateContent(studyTemplateData) {
    for (let i = 0; i < this._studyTemplates.length; ++i) {
      if (this._studyTemplates[i].name === studyTemplateData.name) {
        return Promise.resolve(this._studyTemplates[i].content);
      }
    }
    return Promise.reject(new Error("The study template does not exist"));
  }

  saveStudyTemplate(studyTemplateData) {
    for (let i = 0; i < this._studyTemplates.length; ++i) {
      if (this._studyTemplates[i].name === studyTemplateData.name) {
        this._studyTemplates.splice(i, 1);
        break;
      }
    }
    this._studyTemplates.push(studyTemplateData);
    this._isDirty = true;
    return Promise.resolve();
  }

  getAllStudyTemplates() {
    return Promise.resolve(this._studyTemplates);
  }

  removeDrawingTemplate(toolName, templateName) {
    for (let i = 0; i < this._drawingTemplates.length; ++i) {
      if (
        this._drawingTemplates[i].name === templateName &&
        this._drawingTemplates[i].toolName === toolName
      ) {
        this._drawingTemplates.splice(i, 1);
        this._isDirty = true;
        return Promise.resolve();
      }
    }
    return Promise.reject(new Error("The drawing template does not exist"));
  }

  loadDrawingTemplate(toolName, templateName) {
    for (let i = 0; i < this._drawingTemplates.length; ++i) {
      if (
        this._drawingTemplates[i].name === templateName &&
        this._drawingTemplates[i].toolName === toolName
      ) {
        return Promise.resolve(this._drawingTemplates[i].content);
      }
    }
    return Promise.reject(new Error("The drawing template does not exist"));
  }

  saveDrawingTemplate(toolName, templateName, content) {
    for (let i = 0; i < this._drawingTemplates.length; ++i) {
      if (
        this._drawingTemplates[i].name === templateName &&
        this._drawingTemplates[i].toolName === toolName
      ) {
        this._drawingTemplates.splice(i, 1);
        break;
      }
    }
    this._drawingTemplates.push({
      name: templateName,
      content: content,
      toolName: toolName,
    });
    this._isDirty = true;
    return Promise.resolve();
  }

  getDrawingTemplates() {
    return Promise.resolve(
      this._drawingTemplates.map((template) => template.name)
    );
  }

  getAllChartTemplates() {
    return Promise.resolve(this._chartTemplates.map((x) => x.name));
  }

  saveChartTemplate(templateName, content) {
    const theme = this._chartTemplates.find((x) => x.name === templateName);
    if (theme) {
      theme.content = content;
    } else {
      this._chartTemplates.push({ name: templateName, content });
    }
    this._isDirty = true;
  }

  removeChartTemplate(templateName) {
    this._chartTemplates = this._chartTemplates.filter(
      (x) => x.name !== templateName
    );
    this._isDirty = true;
  }

  getChartTemplateContent(templateName) {
    const content = this._chartTemplates.find(
      (x) => x.name === templateName
    )?.content;
    return Promise.resolve({ content: structuredClone(content) });
  }

  _generateUniqueChartId() {
    const existingIds = this._charts.map((i) => i.id);
    while (true) {
      const uid = Math.random().toString(16).slice(2);
      if (!existingIds.includes(uid)) {
        return uid;
      }
    }
  }

  _getFromLocalStorage(key) {
    if (typeof window !== "undefined") {
      const dataFromStorage = localStorage.getItem(key);
      return JSON.parse(dataFromStorage || "null");
    }
  }

  _saveToLocalStorage(key, data) {
    if (typeof window !== "undefined") {
      const dataString = JSON.stringify(data);
      localStorage.setItem(key, dataString);
    }
  }

  _saveAllToLocalStorage() {
    this._saveToLocalStorage(storageKeys.charts, this._charts);
    this._saveToLocalStorage(storageKeys.studyTemplates, this._studyTemplates);
    this._saveToLocalStorage(
      storageKeys.drawingTemplates,
      this._drawingTemplates
    );
    this._saveToLocalStorage(storageKeys.chartTemplates, this._chartTemplates);
    this._saveToLocalStorage(storageKeys.drawings, this._drawings);
  }
}
