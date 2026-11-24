import './style.css'

const lessons = [
  { chapter: 'A message begins', title: 'Words, before<br>they travel.', description: 'You type a message on your phone. At this moment, it is plain text: readable words held on your device.', mode: 'plain', label: 'Plain text' },
  { chapter: 'A pair of keys', title: 'Two keys.<br>Different jobs.', description: 'Your app creates a key pair. The public key can be shared so people can send you protected messages. The private key stays on your device and is kept secret.', mode: 'keys', label: 'Public + private key' },
  { chapter: 'A shared secret', title: 'Your devices agree<br>in private.', description: 'Your device and Maya’s use their key material to establish a shared secret. The secret lets both devices derive matching encryption keys without sending the secret itself across the network.', mode: 'secret', label: 'Shared secret' },
  { chapter: 'Locked on your device', title: 'Readable here.<br>Scrambled out there.', description: 'Before the message leaves, your device uses an encryption key derived from that secret to turn the words into ciphertext. The lock happens at the edge, on your phone.', mode: 'locked', label: 'Encrypted on this device' },
  { chapter: 'Across the network', title: 'A package the<br>server can carry.', description: 'The service routes the ciphertext to Maya. It can handle delivery and may see information such as who contacted whom and when, but the message contents remain encrypted in transit.', mode: 'network', label: 'Ciphertext in transit' },
  { chapter: 'Opened by Maya', title: 'The words return<br>at the other end.', description: 'Maya’s device has the matching secret-derived key. It decrypts the ciphertext locally, bringing the original message back for her to read. The server never needed the private key.', mode: 'opened', label: 'Decrypted on Maya’s device' },
]
const $ = (s) => document.querySelector(s)
const heading = $('#heading'), description = $('#description'), chapter = $('#chapter'), count = $('#step-count'), visual = $('#device-visual'), message = $('#message-bubble'), fragment = $('#data-fragment'), receiver = $('#receiver-phone'), phone = $('#phone'), wrap = $('#device-wrap')
let current = -1

function setStep(index) {
  index = Math.max(0, Math.min(lessons.length - 1, index))
  if (index === current) return
  current = index
  const lesson = lessons[index]
  chapter.textContent = lesson.chapter
  heading.innerHTML = lesson.title
  description.textContent = lesson.description
  count.textContent = String(index + 1).padStart(2, '0')
  visual.dataset.mode = lesson.mode
  visual.innerHTML = `<span class="visual-lock">${index === 1 ? '⌑' : index === 2 ? '⟷' : index === 5 ? '✓' : '⌑'}</span><span class="visual-label">${lesson.label}</span>`
  message.classList.toggle('cipher', index === 3 || index === 4)
  message.textContent = index === 3 || index === 4 ? 'x9#k·2p!v0_8 ◇ 4m_z' : index === 5 ? 'Meet me by the little bookshop at seven.' : 'Meet me by the little bookshop at seven.'
  fragment.classList.toggle('show', index >= 3 && index <= 4)
  receiver.classList.toggle('show', index >= 4)
  phone.classList.toggle('opened', index === 5)
  document.querySelectorAll('.story-step').forEach((el, i) => el.classList.toggle('active', i === index))
  wrap.dataset.step = String(index)
}

const steps = [...document.querySelectorAll('.story-step')]
const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0]
  if (visible) setStep(Number(visible.target.dataset.step))
}, { threshold: [0.25, 0.5, 0.75] })
steps.forEach(el => observer.observe(el))

document.querySelector('.restart').addEventListener('click', () => { location.hash = 'top'; setStep(0) })
document.querySelector('.begin').addEventListener('click', () => setTimeout(() => setStep(0), 200))
document.querySelector('.again').addEventListener('click', () => setStep(0))

let pointerFrame
phone.addEventListener('pointermove', (event) => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || event.pointerType === 'touch') return
  const rect = phone.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width - .5
  const y = (event.clientY - rect.top) / rect.height - .5
  cancelAnimationFrame(pointerFrame)
  pointerFrame = requestAnimationFrame(() => { phone.style.setProperty('--rx', `${-y * 7}deg`); phone.style.setProperty('--ry', `${x * 9}deg`) })
})
phone.addEventListener('pointerleave', () => { phone.style.setProperty('--rx', '0deg'); phone.style.setProperty('--ry', '0deg') })

let scrollFrame
window.addEventListener('scroll', () => {
  if (scrollFrame) return
  scrollFrame = requestAnimationFrame(() => {
    const section = document.querySelector('.journey')
    const rect = section.getBoundingClientRect()
    const progress = Math.max(0, Math.min(1, -rect.top / (section.offsetHeight - innerHeight)))
    section.style.setProperty('--journey-progress', progress)
    scrollFrame = null
  })
}, { passive: true })
setStep(0)
