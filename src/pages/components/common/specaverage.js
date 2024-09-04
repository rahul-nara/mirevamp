function SpecAverage({avCount, avClass, keyIndex, keyspec}) {
      let avText = 'poor';
      if((avCount >= 4) && (avCount < 6)){
            avText = 'Average';
      }else if((avCount >= 6) && (avCount < 8)){
            avText = 'Good';
      }else if(avCount >= 8){
            avText = 'Excellent';
      }
      return (
            <div className={avClass} key={keyIndex}>
                  <p>{keyspec}</p>
                  <span>({avText})</span>
            </div>
       );
}

export default SpecAverage;