const attach = document.querySelector('.card__right');
const mrn = document.getElementById('mrn');
const patemail = document.getElementById('patemail');
const patadres = document.getElementById('patadres');
const inbdate = document.getElementById('inbdate');
const clinicname = document.getElementById('clinicname');
const duedate = document.getElementById('duedate');
const refsmall = document.getElementById('refsmall');
const reffull = document.getElementById('reffull');
const refclinic = document.getElementById('refclinic');
const billing = document.getElementById('billing');
const attachSmall = document.getElementById('section__attach');
const wrapper = document.querySelector('.resize-drag');

const drag = document.querySelector('.drag');

drag.onmousedown = function(e) {

  let coords = getCoords(drag);
  let shiftX = e.pageX - coords.left;
  let shiftY = e.pageY - coords.top;

  moveAt(e);


  function moveAt(e) {
    wrapper.style.left = e.pageX - shiftX + 'px';
    wrapper.style.top = e.pageY - shiftY + 'px';
  }

  document.onmousemove = function(e) {
    moveAt(e);
  };

  wrapper.onmouseup = function() {
    document.onmousemove = null;
    wrapper.onmouseup = null;
  };

}

drag.ondragstart = function() {
  return false;
};

function getCoords(elem) {   // кроме IE8-
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

// function contentHandler(height, width) {
//   if(width < 1120) {
//     attach.classList.add('item-hidden');
//     if(height > 280 && width < 1120) {
//       mrn.classList.remove('item-hidden');
//       patemail.classList.remove('item-hidden');
//       // duedate.classList.remove('item-hidden');
//       // inbdate.classList.remove('item-hidden');
//       // refsmall.classList.add('item-hidden');
//       // reffull.classList.remove('item-hidden');
//     } else {
//       mrn.classList.add('item-hidden');
//       patemail.classList.add('item-hidden');
//       // duedate.classList.add('item-hidden');
//       // inbdate.classList.add('item-hidden');
//       refsmall.classList.remove('item-hidden');
//       reffull.classList.add('item-hidden');
//     }

//     if(height > 350 && width < 1120) {
//       patadres.classList.remove('item-hidden');
//       clinicname.classList.remove('item-hidden');
//       refclinic.classList.remove('item-hidden');
//       billing.classList.remove('item-hidden');
//     } else {
//       patadres.classList.add('item-hidden');
//       clinicname.classList.add('item-hidden');
//       refclinic.classList.add('item-hidden');
//       billing.classList.add('item-hidden');
//     }
//   } else {
//     attach.classList.remove('item-hidden')
//     mrn.classList.remove('item-hidden');
//     patemail.classList.remove('item-hidden');
//     // duedate.classList.remove('item-hidden');
//     // inbdate.classList.remove('item-hidden');
//     patadres.classList.remove('item-hidden');
//     clinicname.classList.remove('item-hidden');
//     refclinic.classList.remove('item-hidden');
//     billing.classList.remove('item-hidden');
//     refsmall.classList.add('item-hidden');
//     reffull.classList.remove('item-hidden');
//   }

//   // if(height > 305 && width < 1120) {
//   //   mrn.classList.remove('item-hidden');
//   //   patemail.classList.remove('item-hidden');
//   //   duedate.classList.remove('item-hidden');
//   //   inbdate.classList.remove('item-hidden');
//   //   refsmall.classList.add('item-hidden');
//   //   reffull.classList.remove('item-hidden');
//   // } else {
//   //   mrn.classList.add('item-hidden');
//   //   patemail.classList.add('item-hidden');
//   //   duedate.classList.add('item-hidden');
//   //   inbdate.classList.add('item-hidden');
//   //   refsmall.classList.remove('item-hidden');
//   //   reffull.classList.add('item-hidden');
//   // }

//   // if(height > 350 && width < 1120) {
//   //   patadres.classList.remove('item-hidden');
//   //   clinicname.classList.remove('item-hidden');
//   //   refclinic.classList.remove('item-hidden');
//   //   billing.classList.remove('item-hidden');
//   // } else {
//   //   patadres.classList.add('item-hidden');
//   //   clinicname.classList.add('item-hidden');
//   //   refclinic.classList.add('item-hidden');
//   //   billing.classList.add('item-hidden');
//   // }
// }
function contentHandler(height, width) {
  if(width < 1120) {
    attach.classList.add('item-hidden');
    attachSmall.classList.remove('item-hidden');
    if(height > 280) {
      console.log(height, width)
      mrn.classList.remove('item-hidden');
      patemail.classList.remove('item-hidden');
      clinicname.classList.remove('item-hidden');
      reffull.classList.remove('item-hidden');
      refsmall.classList.add('item-hidden');
    } else {
      mrn.classList.add('item-hidden');
      patemail.classList.add('item-hidden');
      clinicname.classList.add('item-hidden')
      refsmall.classList.remove('item-hidden');
      reffull.classList.add('item-hidden');
    }
  } else {
    attachSmall.classList.add('item-hidden');
    attach.classList.remove('item-hidden');
    mrn.classList.remove('item-hidden');
    patemail.classList.remove('item-hidden');
    clinicname.classList.remove('item-hidden');
    reffull.classList.remove('item-hidden');
    refsmall.classList.add('item-hidden');
  }
}

  function makeResizableDiv(div) {
    const element = document.querySelector(div);
    const resizers = document.querySelectorAll(div + ' .resizer')
    const minimum_size = 500;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    for (let i = 0;i < resizers.length; i++) {
      const currentResizer = resizers[i];
      currentResizer.addEventListener('mousedown', function(e) {
        e.preventDefault()
        original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
        original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
        original_x = element.getBoundingClientRect().left;
        original_y = element.getBoundingClientRect().top;
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;
        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResize)
      })
      
      function resize(e) {
        if (currentResizer.classList.contains('bottom-right')) {
          const width = original_width + (e.pageX - original_mouse_x);
          const height = original_height + (e.pageY - original_mouse_y)
          if (width > minimum_size) {
            element.style.width = width + 'px'
          }
          if (height > 240) {
            element.style.height = height + 'px'
          }
        }
        else if (currentResizer.classList.contains('bottom-left')) {
          const height = original_height + (e.pageY - original_mouse_y)
          const width = original_width - (e.pageX - original_mouse_x)
          if (height > 240) {
            element.style.height = height + 'px'
          }
          if (width > minimum_size) {
            element.style.width = width + 'px'
            element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
          }
        }
        else if (currentResizer.classList.contains('top-right')) {
          const width = original_width + (e.pageX - original_mouse_x)
          const height = original_height - (e.pageY - original_mouse_y)
          if (width > minimum_size) {
            element.style.width = width + 'px'
          }
          if (height > 240) {
            element.style.height = height + 'px'
            element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
          }
          contentHandler(height, width)
        }
        else {
          const width = original_width - (e.pageX - original_mouse_x)
          const height = original_height - (e.pageY - original_mouse_y)
          if (width > minimum_size) {
            element.style.width = width + 'px'
            element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
          }
          if (height > 240) {
            element.style.height = height + 'px'
            element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
          }
        }
        
      }
      
      function stopResize() {
        window.removeEventListener('mousemove', resize)
      }
    }
  }
  
  makeResizableDiv('.resize-drag')