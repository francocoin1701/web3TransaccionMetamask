const Web3 = require('web3')

window.onload = ()=>{
    let web3;
    let from;

    //elementos
    const connecButton = document.getElementById('connect');
    const content = document.getElementById('content');
    const account = document.getElementById('account');

    //elementos form

    const send =  document.getElementById('send')
    const direccion = document.getElementById('address');
    const amount = document.getElementById('amount');
    
    
    
    //funciones

    const connect = async()=>{
        if(window.ethereum){
           try {
            window.ethereum.request({method: 'eth_requestAccounts'});
            web3 = new Web3(window.ethereum)
            let accounts = await web3.eth.getAccounts();
            from = accounts[0];
            content.style.display = 'initial';
            connecButton.style.display = 'none'
            account.innerHTML = from;
           } catch (error) {
               console.log('rechazaste la conneccion', error)
           }
        }else{
            alert('conecta metamask')
        }
    }

    const transact = (e)=>{
        e.preventDefault()
        const amounts = amount.value;
        const direccioni = direccion.value
        
        if(Number(amounts) <= 0){
            alert('valor no permitido')
            return
        }
        if(!web3.utils.isAddress(direccioni)){
            alert('direccion no valida')
            return
        }
        web3.eth.sendTransaction({
            from: from,
            to: direccioni,
            value: amounts
        });

    }

    connecButton.onclick = connect;
    send.onsubmit = transact

}
