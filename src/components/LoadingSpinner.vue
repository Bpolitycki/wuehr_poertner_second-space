<template>
    <div class="loadingwrapper" out:fade>
        <div class="spinner">
            <div />
            <div />
        </div>
        <p>Daten werden geladen</p>
    </div>
</template>

<style scoped lang="scss">
.spinner {
    width: 100px;
    height: 100px;
    position: relative;
    margin: 0 auto;
}

.spinner div {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 8px solid transparent;
    border-top-color: $primary;
    border-radius: 50%;
    animation: spinnerOne 1.2s linear infinite;
}

.spinner div:nth-child(2) {
    border: 8px solid transparent;
    border-bottom-color: rgb(25, 78, 101);
    animation: spinnerTwo 1.2s linear infinite;
}

.loadingwrapper p {
    text-align: center;
    margin-top: 1.5rem;
}

@keyframes spinnerOne {
    0% {
        transform: rotate(0deg);
        border-width: 10px;
    }

    50% {
        transform: rotate(180deg);
        border-width: 1px;
    }

    100% {
        transform: rotate(360deg);
        border-width: 10px;
    }
}

@keyframes spinnerTwo {
    0% {
        transform: rotate(0deg);
        border-width: 1px;
    }

    50% {
        transform: rotate(180deg);
        border-width: 10px;
    }

    100% {
        transform: rotate(360deg);
        border-width: 1px;
    }
}
</style>
