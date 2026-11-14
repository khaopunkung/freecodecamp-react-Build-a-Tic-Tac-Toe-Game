const { useState } = React;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // คืนค่า 'X' หรือ 'O' ที่เป็นผู้ชนะ
    }
  }
  return null;
}

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(squares);
  let status;
  
  if (winner) {
    status = `Winner: ${winner}`; // ตรงตามเงื่อนไขโจทย์ข้อ 5 และ 10
  } else if (squares.every(Boolean)) {
    status = "It's a Draw!"; // กรณีช่องเต็มหมดแต่ไม่มีผู้ชนะ (ผลเสมอ)
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  function handleClick(index) {
    // 3.1 ดักป้องกัน: ถ้าช่องนั้นมีค่าอยู่แล้ว (มี X หรือ O) หรือเกมจบแล้ว ให้หยุดการทำงานทันที
    if (squares[index] || calculateWinner(squares)) {
      return;
    }

    // 3.2 สร้างสำเนาอาร์เรย์เดิมเพื่อความปลอดภัยในการอัปเดต State (Immutability)
    const nextSquares = squares.slice();

    // 3.3 กำหนดค่า X หรือ O ตามตาปัจจุบัน
    nextSquares[index] = isXNext ? 'X' : 'O';

    // 3.4 อัปเดต State ของตาราง และสลับตาผู้เล่น
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  }

  // ฟังก์ชันสำหรับรีเซ็ตเกม (รองรับโจทย์ข้อ 4)
  function handleReset() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }
  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        Tic-Tac-Toe
      </h1>
      <div className="status">
      {status}
      </div>
      <div className="board-container">
        {squares.map((value, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      {/* ปุ่มรีเซ็ตสำหรับโจทย์ข้อ 4 */}
      <button
        id="reset"
        onClick={handleReset}
        style={{ display: "block", margin: "15px auto 0 auto", padding: "10px 15px" }}
      >
        Reset Game
      </button>
    </>
  )
}
