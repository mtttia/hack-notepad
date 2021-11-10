import React, { Component } from 'react'
import './Editor.scss'
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { Button } from '@mui/material';
import TitleRoundedIcon from '@mui/icons-material/TitleRounded';
import SubtitlesRoundedIcon from '@mui/icons-material/SubtitlesRounded';
import AlignVerticalTopRoundedIcon from '@mui/icons-material/AlignVerticalTopRounded';
import AlignVerticalCenterRoundedIcon from '@mui/icons-material/AlignVerticalCenterRounded';
import AlignVerticalBottomRoundedIcon from '@mui/icons-material/AlignVerticalBottomRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';

export default class Editor extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      maiuscle: false,
      first: ''
    }

    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  actions = [
    { icon: <TextFieldsRoundedIcon />, name: 'testo', class:"plain-text" },
    { icon: <AlignVerticalBottomRoundedIcon />, name: 'Intestazione 3', class:"intestation-3" },
    { icon: <AlignVerticalCenterRoundedIcon />, name: 'Intestazione 2',class:"intestation-2" },
    { icon: <AlignVerticalTopRoundedIcon />, name: 'Intestazione 1',class:"intestation-1" },
    { icon: <SubtitlesRoundedIcon />, name: 'Sottotitolo',class:"subtitle" },
    { icon: <TitleRoundedIcon />, name: 'Titolo',class:"title" },
  ];

  handleDefaultFormactation(event, classes){
    let parentEl = this.getSelectedElement()
    if(parentEl.id != 'editor'){
      this.removeIntestationClass(parentEl)
      parentEl.classList.add(classes)
    }
    else{
      let html = parentEl.innerHTML
      parentEl.innerHTML = '<div class="'+classes+'">'+html+'</div>'
    }
    
  }

  removeIntestationClass(el){
    el.classList.remove('title')
    el.classList.remove('subtitle')
    el.classList.remove('intestation-1')
    el.classList.remove('intestation-2')
    el.classList.remove('intestation-3')
    el.classList.remove('plain-text')
  }

  handleKeyUp(event) {
    this.setState({first: event.key});

    if(event.key == 'Enter' && this.state.first == 'Enter'){
      //double Enter, so we want to exit from title statment
      let parentEl = this.getSelectedElement()
      console.log(parentEl);  
      this.removeIntestationClass(parentEl)
      console.log('hello');
    }
  }

  getSelectedElement(){
    let parentEl = null, sel;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        parentEl = sel.anchorNode        
        if (parentEl.nodeType != 1) {
          parentEl = parentEl.parentNode;          
        }
      }
    } else if ( (sel = document.selection) && sel.type != "Control") {
      parentEl = sel.createRange().parentElement();
    }
    return parentEl;
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


  render() {
    return (
      <Box sx={{ height: 500, transform: 'translateZ(0px)', flexGrow: 1 }}>
        
      <div id="editor" className="editor plain-text" contentEditable="true" onKeyUp={this.handleKeyUp} onMouseUp={this.handleMouseUp}></div>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {this.actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={e => this.handleDefaultFormactation(e, action.class)}
          />
        ))}
      </SpeedDial>
    </Box>
      
    )
  }
}