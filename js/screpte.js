const colors = ['#FC4F4F', '#FFBC80', '#FF9F45', '#F76E11']
// const shapes = ['square', 'circle', 'triangle', 'heart']
const shapes = ['heart']

const randomIntBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

class Particle {
  constructor({ x, y, rotation, shape, color, size, duration, parent }) {
    this.x = x
    this.y = y
    this.parent = parent
    this.rotation = rotation
    this.shape = shape
    this.color = color
    this.size = size
    this.duration = duration
    this.children = document.createElement('div')
  }

  draw() {
    this.children.style.setProperty('--x', this.x + 'px')
    this.children.style.setProperty('--y', this.y + 'px')
    this.children.style.setProperty('--r', this.rotation + 'deg')
    this.children.style.setProperty('--c', this.color)
    this.children.style.setProperty('--size', this.size + 'px')
    this.children.style.setProperty('--d', this.duration + 'ms')
    this.children.className = `shape ${this.shape}`
    this.parent.append(this.children)
  }

  animate() {
    this.draw()

    const timer = setTimeout(() => {
      this.parent.removeChild(this.children)
      clearTimeout(timer)
    }, this.duration)
    }
}

function animateParticles({ total }) {
  for (let i = 0; i < total; i++) {
    const particle = new Particle({
      x: randomIntBetween(-200, 200),
      y: randomIntBetween(-100, -300),
      rotation: randomIntBetween(-360 * 5, 360 * 5),
      shape: shapes[randomIntBetween(0, shapes.length - 1)],
      color: colors[randomIntBetween(0, colors.length - 1)],
      size: randomIntBetween(4, 7),
      duration: randomIntBetween(400, 800),
      parent
    })
    particle.animate()
  }
}

let intervalTimer = setInterval(() => {
  animateParticles({ total: 8 })
}, 100)

const parent = document.querySelector('span')
parent.addEventListener("touchstart", () => {}, false);
parent.addEventListener('click', e => {
  if (intervalTimer) {
    clearInterval(intervalTimer)
    intervalTimer = null
    parent.classList.remove('pumping')
  }
  animateParticles({ total: 40 })
})
/*  */
const carouselItems = document.querySelectorAll('.carousel li');
const paginationItems = document.querySelectorAll('.pagination li');
const nextButtons = document.querySelectorAll('.next');
const title = document.querySelector('#item-title');

let activeItem = 0;

const updateItems = (announce = true) => {
	carouselItems.forEach((item, i) => {
    const isActive = activeItem % carouselItems.length === i;
    item.classList[isActive ? 'add' : 'remove']('active')
    item.setAttribute('aria-hidden', isActive ? false : true)
                      
    if(isActive) {
      if(announce) title.innerText = `Carousel updated to ${item.dataset.title} content`
      item.focus();
    }
  })
	paginationItems.forEach((item, i) => item.classList[activeItem % paginationItems.length === i ? 'add' : 'remove']('active'))
	nextButtons.forEach((item, i) => item.setAttribute('tabindex', activeItem % paginationItems.length === i ? null : -1))
}

paginationItems.forEach((item, i) => {
	item.addEventListener('click', () => {
		activeItem = i;
    updateItems();
	})
})

nextButtons.forEach((item, i) => {
	item.addEventListener('click', () => {
    activeItem++;
		updateItems();
	})
})

updateItems(false);
