function hitung() {
    let weight = document.getElementById('weight').value;
    let height = document.getElementById('height').value;
    let meter = height / 100;
    let total = weight / (meter * meter);
    let total2 = Math.round(total)
  
    document.getElementById("hasil").innerText = "your BMI is" + " " + total2 ;
    if (total2 < 18.5) {
        document.getElementById('hasil2').innerText = 'You are Under Weight';
        }
        else if (total2 >= 18.5 && total2 <= 24.9) {
                document.getElementById('hasil2').innerText = 'You are Normal';
            }
            else if (total2 >= 25 && total2 <= 29.9) {
                document.getElementById('hasil2').innerText = 'You are Over Height';
            }
            else if (total2 >= 30) {
                document.getElementById('hasil2').innerText = 'You are Obese';
            }
            
        }
    

