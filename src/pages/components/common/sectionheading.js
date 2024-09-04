function SectionHeading({title, titleClass}) {
      return (
            <div className="section-heading">
                  <h2 className={`title ${titleClass ? titleClass : ''}`}><span>{title[0]}</span> <span>{title[1]}</span></h2>
            </div>
       );
}

export default SectionHeading;