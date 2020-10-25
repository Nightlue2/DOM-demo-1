window.dom = {
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  pick(string) {
    const node = document.querySelector(string);
    if (node !== null) {
      return node;
    } else {
      return false;
    }
  },
  pickAll(string) {
    const node = document.querySelectorAll(string);
    if (node.length === 0) {
      return false;
    } else {
      return node;
    }
  },
  after(oldNode, newNode) {
    oldNode.parentNode.insertBefore(newNode, oldNode.nextSibling);
  },
  before(newNode, oldNode) {
    oldNode.parentNode.insertBefore(newNode, oldNode);
  },
  append(parent, node) {
    parent.appendChild(node);
  },
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  empty(node) {
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  attr(node, name, value) {
    // 重载
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    // 适配
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div, 'color', 'red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        // dom.style(div, 'color')
        return node.style[name];
      } else if (name instanceof Object) {
        // dom.style(div, {color: 'red'})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  addClass(node, className) {
    node.classList.add(className);
  },
  removeClass(node, className) {
    node.classList.remove(className);
  },
  hasClass(node, className) {
    return node.classList.contains(className);
  },
  on(node, eventName, fn, propagation) {
    node.addEventListener(
      eventName,
      fn,
      propagation === undefined ? false : propagation
    );
  },
  off(node, eventName, fn, propagation) {
    node.removeEventListener(
      eventName,
      fn,
      propagation === undefined ? false : propagation
    );
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  next(node) {
    return node.nextElementSibling;
    // while(x && x.nodeType === 3){
    //   x = x.nextSibling
    // }
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    const list = dom.children(node.parentNode);
    for (let i = 0; i < list.length; i++) {
      if (list[i] === node) {
        return i;
      }
    }
  },
};
