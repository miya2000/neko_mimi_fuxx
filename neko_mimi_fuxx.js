/**
// http://www.aichi-pu.ac.jp/ist/~ohkubo/sb/log/eid3.html
新言語　neko mimi Fu**?
・1レス内に全命令のリファレンスが入る素敵な言語。
    ネコミミ！                 ポインタをインクリメント
    ネコミミモード             ポインタをデクリメント
    おにいさま                 ポインタが示すメモリ位置のデータをインクリメント
    私のしもべー               ポインタが示すメモリ位置のデータをデクリメント
    や・く・そ・く・よ         ポインタが示すメモリ位置のデータを出力
    フルフルフルムーン         ポインタが示すメモリ位置のデータに入力
    キスキス…                 ポインタが示すメモリ位置のデータがヌルなら対応する キス…したくなっちゃった… までジャンプ
    キス…したくなっちゃった… ポインタが示すメモリ位置のデータがヌルじゃないなら対応する キスキス… までジャンプ
*/
(function() {

// http://d.hatena.ne.jp/amachang/20061201/1164986067
/*@cc_on var currentScript = (function (e) { if(e.nodeName.toLowerCase() == 'script') return e; return arguments.callee(e.lastChild) })(document);
// @*/ var currentScript = document.evaluate('//script[last()]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

// http://twitter.com/nanto_vi/statuses/418740272
var prog = currentScript.textContent || currentScript.text;

// http://tate.undef.jp/days/200710/nekomimifuck.txt
/*
var map = {
    ネコミミ！                 : '>',
    ネコミミモード             : '<',
    おにいさま                 : '+',
    私のしもべー               : '-',
    や・く・そ・く・よ         : '.',
    フルフルフルムーン         : ',',
    キスキス…                 : '[',
    キス…したくなっちゃった… : ']'
};
*/
var fuxx = [
    'ネコミミ！',
    'ネコミミモード',
    'おにいさま',
    '私のしもべー',
    'や・く・そ・く・よ',
    'フルフルフルムーン',
    'キスキス…',
    'キス…したくなっちゃった…'
];
var re = fuxx.join('|');
var ptr = 0, pc = 0, data = [], jump = [], stack = [], code;
code = prog.match(new RegExp(re, "g"));
for (var i=0; i < code.length; ++i) {
    var c = code[i];
    if (c == 'キスキス…') {
        stack.push(i); continue;
    }
    if (c != 'キス…したくなっちゃった…') {
        continue;
    }
    if (stack.length == 0) {
        throw "error: 予想外の キス…したくなっちゃった…";
    }
    var open = stack.pop();
    jump[open] = i + 1;
    jump[i]    = open;
}
if (stack.length > 0) {
    throw "error: キスキス… が閉じられていない";
}
while(pc < code.length) {
    var c = code[pc];
         if (c == 'キスキス…'                ) { if (!data[ptr]) { pc = jump[pc]; continue; } }
    else if (c == 'キス…したくなっちゃった…') { pc = jump[pc]; continue; }
    else if (c == 'フルフルフルムーン'        ) { data[ptr] = prompt("input value for data[" + ptr + "]: "); }
    else if (c == 'や・く・そ・く・よ'        ) { document.write(String.fromCharCode(data[ptr])) }
    else if (c == 'おにいさま'                ) { data[ptr] = (ptr in data) ? data[ptr] + 1 : 1; }
    else if (c == '私のしもべー'              ) { --data[ptr]; }
    else if (c == 'ネコミミ！'                ) { ++ptr; }
    else if (c == 'ネコミミモード'            ) { --ptr; }
    ++pc;
}
})()

