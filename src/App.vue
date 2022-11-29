<template>
  <div class="wrapper-2" ref="wrapper">
    <video crossOrigin="anonymous" id="localVideo" ref="localVideoDOM" :srcObject="stream" autoplay="autoplay"
      object-fit="contain"></video>
    <button id="playVideo">play video</button>
    <div class="action-group">
      <button id="showPic" ref="showPicDOM" @click="showPic"></button>
      <button id="takePhoto" @click="takePhoto"></button>
      <button id="switchCamera" @click="switchCamera">switch</button>
    </div>
  </div>
</template>

<script>
import { showImagePreview } from 'vant';
import html2canvas from 'html2canvas'
export default {
  name: 'App',
  data() {
    return {
      isFront: true,
      stream: null,
      photoList: []
    }
  },
  mounted() {
    this.getMedia(true, () => {
      this.isFront = true;
    }, function (err) {
      console.log(err);
      alert('摄像头调用失败');
    });
  },
  methods: {
    getMedia(front, cb, errCb) {
      // 调取摄像头
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: front ? 'user' : 'environment',
          },
          audio: false,
        })
        .then((stream) => {
          // 清除上一次视频流
          if (this.stream) {
            this.stream.getTracks().forEach((track) => {
              track.stop();
            });
          }
          // 播放视频流
          this.stream = stream;
          cb && cb();
        })
        .catch(function (err) {
          errCb && errCb(err);
        });
    },
    switchCamera() {
      // 切换前后摄像头
      this.getMedia(!this.isFront, () => {
        this.isFront = !this.isFront;
        console.log(this.isFront, 'this.isFront');
      }, function (err) {
        console.log(err);
        alert('切换摄像头失败');
      });
    },
    async takePhoto() {
      const localVideoDOM = this.$refs.localVideoDOM
      this.$nextTick(async () => {
        var data = await this.convertToImage(localVideoDOM)
        this.$refs.showPicDOM.setAttribute("style", "background-image:url(" + data + ")");
        this.photoList.unshift(data)
      })
    },
    convertToImage(container) {
      return html2canvas(container).then(canvas => {
        // 返回图片的二进制数据
        return canvas.toDataURL("image/jpg");
      });
    },
    showPic() {
      this.photoList.length && showImagePreview(this.photoList);
    }
  }
}
</script>

<style>
@import url('./assets/style.css');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
