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
const wrapper = document.querySelector('.resize-drag');

interact('.resize-drag')
  .resizable({
    // resize from all edges and corners
    edges: { left: false, right: true, bottom: true, top: true },

    listeners: {
      move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        contentHandler(event.rect.height, event.rect.width)

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
        // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 498, height: 203 }
      })
    ],

    inertia: true
  })

interact('.drag')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {
        var textEl = event.target.querySelector('p')

        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
      }
    }
  })

  function dragMoveListener (event) {
    var target = wrapper
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
  
    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
  
    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }
  
  // this function is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener

  function contentHandler(height, width) {
    if(width < 1120) {
      attach.classList.add('item-hidden');
      if(height > 305 && width < 1120) {
        mrn.classList.remove('item-hidden');
        patemail.classList.remove('item-hidden');
        // duedate.classList.remove('item-hidden');
        // inbdate.classList.remove('item-hidden');
        refsmall.classList.add('item-hidden');
        reffull.classList.remove('item-hidden');
      } else {
        mrn.classList.add('item-hidden');
        patemail.classList.add('item-hidden');
        // duedate.classList.add('item-hidden');
        // inbdate.classList.add('item-hidden');
        refsmall.classList.remove('item-hidden');
        reffull.classList.add('item-hidden');
      }
  
      if(height > 350 && width < 1120) {
        patadres.classList.remove('item-hidden');
        clinicname.classList.remove('item-hidden');
        refclinic.classList.remove('item-hidden');
        billing.classList.remove('item-hidden');
      } else {
        patadres.classList.add('item-hidden');
        clinicname.classList.add('item-hidden');
        refclinic.classList.add('item-hidden');
        billing.classList.add('item-hidden');
      }
    } else {
      attach.classList.remove('item-hidden')
      mrn.classList.remove('item-hidden');
      patemail.classList.remove('item-hidden');
      // duedate.classList.remove('item-hidden');
      // inbdate.classList.remove('item-hidden');
      patadres.classList.remove('item-hidden');
      clinicname.classList.remove('item-hidden');
      refclinic.classList.remove('item-hidden');
      billing.classList.remove('item-hidden');
      refsmall.classList.add('item-hidden');
      reffull.classList.remove('item-hidden');
    }

    // if(height > 305 && width < 1120) {
    //   mrn.classList.remove('item-hidden');
    //   patemail.classList.remove('item-hidden');
    //   duedate.classList.remove('item-hidden');
    //   inbdate.classList.remove('item-hidden');
    //   refsmall.classList.add('item-hidden');
    //   reffull.classList.remove('item-hidden');
    // } else {
    //   mrn.classList.add('item-hidden');
    //   patemail.classList.add('item-hidden');
    //   duedate.classList.add('item-hidden');
    //   inbdate.classList.add('item-hidden');
    //   refsmall.classList.remove('item-hidden');
    //   reffull.classList.add('item-hidden');
    // }

    // if(height > 350 && width < 1120) {
    //   patadres.classList.remove('item-hidden');
    //   clinicname.classList.remove('item-hidden');
    //   refclinic.classList.remove('item-hidden');
    //   billing.classList.remove('item-hidden');
    // } else {
    //   patadres.classList.add('item-hidden');
    //   clinicname.classList.add('item-hidden');
    //   refclinic.classList.add('item-hidden');
    //   billing.classList.add('item-hidden');
    // }
  }