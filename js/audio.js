var $media = document.getElementById('box')
$list = document.getElementById('list')
var currIndex = 0
$media.src = baseUrl + playList[0].url
createList()
function createList() {
  console.info('*************创建歌曲列表****************', currIndex)
  for (var i = 0; i < playList.length; i++) {
    var $li = document.createElement('li')
    $li.classList.add('list-item')
    var url = playList[i].url
    $li.dataset.index = i
    $li.innerText = playList[i].url.substring(0, url.length - 4)
    console.info('*************添加歌曲列表****************', currIndex)
    $list.appendChild($li)
  }
}
$list.onclick = function (e) {
  $list.getElementsByTagName('li')[currIndex].classList.remove('play')
  currIndex = e.target.dataset.index
  setPlay()
}
// $li.onclick = function () {
//   currIndex = $li.dataset.index
//   console.info(currIndex)
//   setPlay()
// }
var $pre = document.getElementById('pre')
var $next = document.getElementById('next')
// pre
$pre.onclick = function () {
  $list.getElementsByTagName('li')[currIndex].classList.remove('play')
  console.info('*************上一首before****************', currIndex)
  if (currIndex > 0) {
    currIndex--
  } else {
    currIndex = playList.length - 1
  }
  console.info('*************上一首after****************', currIndex)
  setPlay()
}

// next
$next.onclick = function () {
  $list.getElementsByTagName('li')[currIndex].classList.remove('play')
  console.info('*************下一首before****************', currIndex)
  if (currIndex < playList.length - 1) {
    currIndex++
  } else {
    currIndex = 0
  }
  console.info('*************下一首after****************', currIndex)
  setPlay()
}
$play = document.getElementById('play')
$pause = document.getElementById('pause')

$pointer = document.getElementById('pointer')
$cover = document.getElementById('cover')

$play.onclick = function () {
  setPlay()
}
$pause.onclick = function () {
  paused()
}
// set and play
function setPlay() {
  $pointer.classList.remove('play')
  $media.src = baseUrl + playList[currIndex].url
  setTimeout(function () {
    $pointer.classList.add('play')
    $cover.classList.add('play')
    $list.getElementsByTagName('li')[currIndex].classList.add('play')
    $media.play()
  }, 300)
}

// paused
function paused() {
  $pointer.classList.remove('play')
  $cover.classList.remove('play')
  $media.pause()
}
// play
function play() {
  $pointer.classList.add('play')
  $cover.classList.add('play')
  $media.play()
}

$media.addEventListener('timeupdate', function() {
  updateProgress()
}, false)

function updateProgress() {
  if ($media.ended) {
    console.info('*************播放下一首****************')
    $next.click()
  }
}