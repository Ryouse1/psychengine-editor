import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { addNote } from "../notes.js";

export default function CanvasEditor({ song }) {
  const canvasRef = useRef();
  const [notes, setNotes] = useState([]);
  const [audio, setAudio] = useState(null);

  useEffect(()=>{
    const howl = new Howl({ src: ['/public/assets/sample.mp3'] });
    setAudio(howl);
  },[]);

  useEffect(()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      // 背景グリッド
      for(let i=0;i<8;i++){
        ctx.strokeStyle = "#555";
        ctx.beginPath();
        ctx.moveTo(0, i*50);
        ctx.lineTo(canvas.width, i*50);
        ctx.stroke();
      }
      // ノーツ描画
      for(const n of notes){
        ctx.fillStyle = "red";
        ctx.fillRect(n[0], n[1]*50, 10, 40);
      }
      requestAnimationFrame(draw);
    }
    draw();
  },[notes]);

  const handleClick = e=>{
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const track = Math.floor(y/50);
    const time = x;
    addNote(time, track);
    setNotes(prev=>[...prev,[time,track]]);
  };

  return (
    <div>
      <canvas ref={canvasRef} width={1200} height={400} onClick={handleClick}></canvas>
      <button onClick={()=>audio.play()}>再生</button>
      <button onClick={()=>{
        const json = JSON.stringify({ song: { ...song, notes } },null,2);
        const blob = new Blob([json],{type:'application/json'});
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "notes.json";
        a.click();
      }}>JSON出力</button>
    </div>
  );
}
