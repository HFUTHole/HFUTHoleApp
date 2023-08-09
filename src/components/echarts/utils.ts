export const toString = (obj: object) => {
  if (obj === undefined) {
    return JSON.stringify({})
  }

  return JSON.stringify(obj, (_, val) => {
    if (typeof val === 'function') {
      return val.toString()
    }
    return val
  })
}

export const getJavascriptSource = (options: string) => {
  return `
    const options = ${options}


    var dom = document.getElementById('container');
    var myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    myChart.setOption(options);

    function parse (data) {
      return JSON.parse(data, function (key, value) {

          if (value
              && typeof value === "string"
              && value.substr(0,8) === "function") {

              const startBody = value.indexOf('{') + 1;
              const endBody = value.lastIndexOf('}');
              const startArgs = value.indexOf('(') + 1;
              const endArgs = value.indexOf(')');

              return new Function(value.substring(startArgs, endArgs)
                                , value.substring(startBody, endBody));
          }
          return value;
      });
    }

    function processMessage(e) {
      myChart.setOption(parse(e.data))
    }

    window.document.addEventListener('message', processMessage);

    window.addEventListener('message', processMessage);

    window.addEventListener('resize', myChart.resize);
  `
}

// let newDiv = document.createElement("div");
// let newContent = document.createTextNode('aaaa');
// newDiv.appendChild(newContent);
// document.body.appendChild(newDiv)
