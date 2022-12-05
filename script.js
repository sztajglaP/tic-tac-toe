window.onload = () => {
    game.init();
}

class Game {
    playerOSign = '<i class="fa-regular fa-circle"></i>';
    playerXSign = '<i class="fa-solid fa-x"></i>';
    currentPlayer = undefined;
    points = {
        o: 0,
        x: 0
    }

    winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ];

    init = () => {
        this.allSquares = document.querySelectorAll('.square');
        this.allSquares.forEach(square => square.addEventListener('click', (e) => {
            this.clickSquare(e);
        }));
        this.popup = document.querySelector('.popup');

        this.startGame();
    }

    clickSquare = (e) => {
        if(!e.target.classList.contains('square')) return;

        const clickedSquare = e.target;

        this.addSign(clickedSquare);
    }

    addSign = (clickedSquare) => {
        if(clickedSquare.innerHTML != '') return;

        clickedSquare.innerHTML = this.currentPlayer;

        this.checkWinner();
        this.changePlayer();
    }

    changePlayer = () => {
        const playerOTurnInfo = document.querySelector('.turn-o');
        const playerXTurnInfo = document.querySelector('.turn-x');

        if(this.currentPlayer == this.playerOSign) {
            this.currentPlayer = this.playerXSign;
            playerOTurnInfo.style.display = 'none';
            playerXTurnInfo.style.display = 'block';
        } else {
            this.currentPlayer = this.playerOSign;
            playerOTurnInfo.style.display = 'block';
            playerXTurnInfo.style.display = 'none';
        }
    }

    checkWinner = () => {
        this.winConditions.forEach(el => {
            const a = document.getElementById(el[0]);
            const b = document.getElementById(el[1]);
            const c = document.getElementById(el[2]);

            if(a.innerHTML != '' && b.innerHTML != '' && c.innerHTML != '' && a.innerHTML == b.innerHTML && b.innerHTML == c.innerHTML) {
                a.classList.add('win');
                b.classList.add('win');
                c.classList.add('win');

                this.addPoints();
                this.showPopup();
            } 
        });
    }

    addPoints = () => {
        if(this.currentPlayer == this.playerOSign) {
            this.points.o++;
            const playerO = document.querySelector('#player-o');
            playerO.innerHTML = this.points.o;
        } else {
            this.points.x++;
            const playerX = document.querySelector('#player-x');
            playerX.innerHTML = this.points.o;
        }
    }

    showPopup = () => {
        this.popup = document.querySelector('.popup');
        const winner = this.popup.querySelector('.winner');

        winner.innerHTML = this.currentPlayer;
        this.popup.classList.add('active');

        const nextRoundBtn = document.querySelector('#next-round');
        const resetGameBtn = document.querySelector('#reset-game');

        nextRoundBtn.addEventListener('click', this.setNextRound);
        resetGameBtn.addEventListener('click', this.startGame);
    }

    setNextRound = () => {
        this.popup.classList.remove('active');

        this.allSquares.forEach(square => {
            square.classList.remove('win');
            square.innerHTML = '';
        });
    }

    startGame = () => {
        this.popup.classList.remove('active');

        this.allSquares.forEach(square => {
            square.classList.remove('win');
            square.innerHTML = '';
        });

        this.points.o = 0;
        this.points.x = 0;

        const turnO = document.querySelector('.turn-o');
        const turnX = document.querySelector('.turn-x');
        const playerO = document.querySelector('#player-o');
        const playerX = document.querySelector('#player-x');

        turnO.style.display = 'block';
        turnX.style.display = 'none';
        
        playerO.innerHTML = this.points.o;
        playerX.innerHTML = this.points.x;

        this.currentPlayer = this.playerOSign;
    }
}

const game = new Game();