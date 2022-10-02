import btnClick from "../assets/btnClick.wav"

export function formatNumberAb(num, fixed, lvl) {
  if (num < 1e3 && lvl) return  num;
  if (num < 1e3) return num.toFixed(fixed);
  if (num >= 1e3 && num < 1e6) return +(num / 1e3).toFixed(fixed) + "K";
  if (num >= 1e6 && num < 1e9) return +(num / 1e6).toFixed(fixed) + "M";
  if (num >= 1e9 && num < 1e12) return +(num / 1e9).toFixed(fixed) + "B";
  if (num >= 1e12 && num < 1e15) return +(num / 1e12).toFixed(fixed) + "T";
  if (num >= 1e15 && num < 1e18) return +(num / 1e15).toFixed(fixed) + "A";
  if (num >= 1e18 && num < 1e21) return +(num / 1e18).toFixed(fixed) + "B";
  if (num >= 1e21) return +(num / 1e21).toFixed(fixed) + "C";
}

export function PlayBtnClick(enabled){
  let audio = new Audio(btnClick)

  if (enabled) {
    return audio.play()
  } else {
    return
  }

}
