const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            rounds: 0,
            winner: null,
            battleLog: []
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'player';
            }
        }
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return {width: 0 + '%'}
            }
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return {width: 0 + '%'}
            }
            return {width: this.playerHealth + '%'}
        },
        isSpecialAttackIsAvailable() {
            return this.rounds % 3 !== 0;
        }
    },
    methods: {
        attackMonster() {
            this.rounds++;
            const attackValue = getRandomInt(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomInt(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue);
        },
        specialAttackMonster() {
            this.rounds++;
            const attackValue = getRandomInt(10, 20);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            this.attackPlayer();
        },
        healPlayer() {
            this.rounds++;
            const healValue = getRandomInt(10, 25);
            if ((this.playerHealth + healValue) > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessage('player', 'heal', healValue);
            this.attackPlayer();
        },
        resetGame() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.winner = null;
            this.rounds = 0;
            this.battleLog = [];
        },
        surrender() {
          this.winner = 'monster';
        },
        addLogMessage(actionName, actionType, actionValue) {
            this.battleLog.unshift({
                actionName: actionName,
                actionType: actionType,
                actionValue: actionValue,
            })
        }
    }
})

app.mount('#game')