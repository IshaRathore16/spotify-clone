console.log("Welcomem to Spotify");

//Intializing the variables
let songIndex=0;
let audioElement=new  Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songItems= Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName:"Let me Love you",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Closure",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"Tera Ghata",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"Maahi ve",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"maan meri jaan",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"tera hua",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    {songName:"humsafar",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
]

songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

//Listen to events

//Handle play pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate',()=>{
  //  console.log('timeupdate');
    //Update SeekBar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);  //how much percent the song is played
    console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src="songs/${songIndex}.mp3";
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6){
        songIndex=0;
    }
    else{
        songIndex++;
    }
    audioElement.src='songs/${songIndex+1}.mp3';
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('prev').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=6;
    }
    else{
        songIndex--;
    }
    audioElement.src='songs/${songIndex+1}.mp3';
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
