'use client'

export default function title({ text }) {
  function copy() {
    window.alert(text)
    navigator.clipboard.writeText(text)
  }
 
  return <p className="cursor-pointer" onClick={copy}>{text}</p>
}
