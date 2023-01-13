// 本插件由CardLink定制而成，原项目源码: https://github.com/Lete114/CardLink

function renderer(el, obj) {
  if (obj.success != true) return

  var autofill = [];
  const autofillStr = el.getAttribute('autofill');
  if (autofillStr) {
    autofill = autofillStr.split(',');
  }
  if (obj.data.title && obj.data.title.length > 0 && autofill.includes('title')) {
    el.querySelector('.title').innerHTML = obj.data.title;
    el.title = obj.data.title;
  }
  if (obj.data.icon && obj.data.icon.length > 0 && autofill.includes('icon')) {
    el.querySelector('.img').style = 'background-image: url("' + obj.data.icon + '");';
    el.querySelector('.img').setAttribute('data-bg', obj.data.icon);
  }
  let desc = el.querySelector('.desc');
  if (desc && obj.data.description && obj.data.description.length > 0 && autofill.includes('desc')) {
    desc.innerHTML = obj.data.description;
  }
}

/**
 * Create card links
 * @param {NodeList} nodes A collection of nodes or a collection of arrays,
 * if it is an array then the array must always contain node element
 */
function setCardLink(nodes) {
  // If the `nodes` do not contain a `forEach` method, then the default `a[cardlink]` is used
  nodes = 'forEach' in (nodes || {}) ? nodes : document.querySelectorAll('a[cardlink]')
  nodes.forEach((el) => {
    // If it is not a tag element then it is not processed
    if (el.nodeType !== 1) return
    el.removeAttribute('cardlink');
    const link = el.href;
    const api = 'https://api.xsot.cn/site_info/?url=';
    fetch(api + link).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    }).then(function (data) {
      renderer(el, data);
    }).catch(function (error) {
      console.log(error);
    });
  })
}
