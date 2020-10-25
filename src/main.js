import "babel-polyfill";
const codeArea = dom.pick("#showCode > span");
const codeWrapper = dom.pick("#showCode");
let storeString = "";
dom.text(codeArea, "");
function printCode(string) {
  let i = 0;
  return new Promise((resolve) => {
    const id = setInterval(() => {
      storeString = storeString + string[i];
      dom.text(codeArea, storeString);
      i++;
      codeWrapper.scrollTop = codeWrapper.scrollHeight;
      if (i === string.length) {
        resolve("success");
        window.clearInterval(id);
      }
    }, 50);
  });
}
async function access() {
  const show = dom.pick("#showContent");
  const square = dom.create(
    "<div id='square'>使用create创建的第一个元素</div>"
  );
  await printCode(`const show = dom.pick('#showContent')
  const square = dom.create("
  <div id='square'>
    使用create创建的第一个元素
  </div>
  ")
  dom.append(show,square)
  `);
  dom.append(show, square);
  await printCode(`dom.text(square)
  `);
  alert("正方形的文本内容为：" + dom.text(square));
  await printCode(`dom.text(square,'修改之后第一个元素的文本')
  `);
  dom.text(square, "修改之后第一个元素的文本");
  await printCode(`dom.attr(square,'id')
  `);
  alert("正方形的id为：" + dom.attr(square, "id"));
  await printCode(`dom.attr(square,'style','border:1px solid #81b9ff'); //把正方形的边框改成蓝色
  `);
  dom.attr(square, "style", "border:1px solid #81b9ff;");
  await printCode(`const round = dom.create("<div id='round'></div>")
  dom.append(show,round)
  `);
  const round = dom.create("<div id='round'></div>");
  dom.append(show, round);
  await printCode(`dom.before(round,square) //圆和正方形调换位置
  `);
  dom.before(round, square);
  await printCode(`dom.append(square,round) //把圆放到正方形里
  `);
  dom.append(square, round);
  await printCode(
    'dom.append(show,dom.create("' +
      "\n" +
      "<span>" +
      "\n" +
      "即将被移除的第${i+1}个元素" +
      "\n" +
      "</span>" +
      '"))*3' +
      `\n`
  );
  for (let i = 0; i < 3; i++) {
    dom.append(
      show,
      dom.create(`<span>
    即将被移除的第${i + 1}个元素
    </span>`)
    );
  }
  await printCode(`dom.each(dom.pickAll('span'),
  item=>dom.style(item,'color','red')
  )
  `);
  dom.each(dom.pickAll("#showContent > span"), (item) =>
    dom.style(item, "color", "red")
  );
  await printCode(`dom.remove(dom.pick('span')) //删除一个span标签
  `);
  dom.remove(dom.pick("#showContent > span"));
  await printCode(`const clickFunc = function(e){
    window.alert('点击触发的目标的id是'+ e.target.id);
  }
  dom.on(round,'click',clickFunc);
  `);

  const clickFunc = function (e) {
    window.alert("点击触发的目标的id是" + e.target.id);
  };
  dom.on(round, "click", clickFunc);
  setTimeout(() => {
    dom.off(round, "click", clickFunc);
  }, 5000);
  await printCode(`dom.parent(round)
  `);
  dom.parent(round);
  await printCode(`dom.children(square)
`);
  alert("正方形的孩子节点：" + dom.children(square)); //数组
  await printCode(`dom.siblings(square)
`);
  alert("正方形的兄弟节点：" + dom.siblings(square)); //数组
  await printCode(`dom.next(square)
`);
  alert("正方形的下一个兄弟节点：" + dom.next(square));
  await printCode(`dom.index(dom.pick('span'))
`);
  alert(
    "span元素是内容区里的第" +
      String(dom.index(dom.pick("#showContent > span")) + 1) +
      "位"
  );
  await printCode(`dom.empty(show) //6秒后清空所有用于展示的节点
`);
  setTimeout(() => {
    dom.empty(show);
  }, 6000);
}
access();
