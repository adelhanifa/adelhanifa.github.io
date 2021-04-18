function toSection2() {
    document.querySelector('.heading').scrollIntoView()
}

function toSection1() {
    document.querySelector('.section1').scrollIntoView()
}

function setTwoImgsStyle() {
    const img_container_width = document.getElementById('left-part-container').offsetWidth
    const img1_width = document.getElementById('img1').offsetWidth
    const img1_height = 1.33 * img1_width
    const img2_width = document.getElementById('img2').offsetWidth
    const img2_height = img2_width
    const container_height = img1_height + (img1_width + img2_width - img_container_width)

    document.getElementById('img-container').style.height = `${container_height}px`;
    document.getElementById('img2').style.top = `${container_height - img2_height}px`;
}

window.onresize = setTwoImgsStyle
setTwoImgsStyle()