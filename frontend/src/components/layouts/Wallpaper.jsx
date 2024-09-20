import "../../styles/wallpaper.css"

export default function Wallpaper() {
  const handleMouseIn = (e) => {
    e.target.style.transitionDuration = '0.1s';
  }
  const handleMouseOut = (e) => {
    e.target.style.transitionDuration = '3s';
  }
  return (
    <div className='flex flex-wrap wallpaper absolute h-screen w-full'>
        {Array.from({ length: 400 }).map((_, index) => (
          <div key={index} className="item w-[5vw] h-[5vh]" onMouseEnter={handleMouseIn} onMouseLeave={handleMouseOut}></div>
        ))}
    </div>
  )
}
