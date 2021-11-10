import React, { Component } from 'react'

export default class Editor extends Component{
  constructor(props) {
    super(props)

    this.state = {
      maiuscle: false
    }
  }

  handleKeyUp(event) {
    console.log(event.key)
  }

  makeTextBold(event) {
    let sel, range;
      if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          let oldText = sel.toString()
          let html = '<b>' + oldText + '</b>'
          range.deleteContents();

          // Range.createContextualFragment() would be useful here but is
          // non-standard and not supported in all browsers (IE9, for one)
          const el = document.createElement("div");
          el.innerHTML = html;
          let frag = document.createDocumentFragment(),
            node,
            lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          range.insertNode(frag);

          // Preserve the selection
          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      }
  }

  makeTextTitle(event) {
    var parentEl = null, sel;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            parentEl = sel.getRangeAt(0).commonAncestorContainer;
            if (parentEl.nodeType != 1) {
              parentEl = parentEl.parentNode;
              parentEl.setAttribute('style', 'color:blue')
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        parentEl = sel.createRange().parentElement();
    }
    return parentEl;

  }

  render() {
    return (
      <div>
        <div id="editor" className="editor" contentEditable="true" onKeyUp={this.handleKeyUp} onMouseUp={this.handleMouseUp}></div>
        <button onClick={this.makeTextBold}>Bold me</button>
        <button onClick={this.makeTextTitle}>Make title</button>
      </div>
    )
  }
}