
export default function prayer({name , time}) {
  return (
    <div className="prayer">
      <p className="prayer-name"> {name}</p>
      <p className="prayer-time">{time}</p>
    </div>
  )
}

