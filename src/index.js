const Web3 = require('web3')
const artifacs = require('../build/contracts/francoCoin.json')


window.onload = ()=>{
    let web3;
    let from;
    let FrtContract;

    //elementos
    const connecButton = document.getElementById('connect');
    const content = document.getElementById('content');
    const account = document.getElementById('account');

    //elementos form

    const send =  document.getElementById('send')
    const direccion = document.getElementById('address');
    const amount = document.getElementById('amount');

    //elementos formErc20
    const sendErc20 =  document.getElementById('sendErc20')
    const direccionErc20 = document.getElementById('addressErc20');
    const amountErc20 = document.getElementById('amountErc20');   
    const balanceErc20 = document.getElementById('banlanceErc20')
    
    
    //funciones

    const connect = async()=>{
        if(window.ethereum){
           try {
            await window.ethereum.request({method: 'eth_requestAccounts'});
            web3 = new Web3(window.ethereum)
            let accounts = await web3.eth.getAccounts();
            from = accounts[0];
            //const networkId = await web3.eth.net.getId()
            FrtContract = new web3.eth.Contract(artifacs.abi, artifacs.networks[5777].address);
            const balanceFrt = await FrtContract.methods.balanceOf(from).call();
            //console.log(balanceFrt)
            balanceErc20.innerHTML = `
                <h1>${balanceFrt}</h1>
            `;
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
    const transactErc20 = async(e)=>{
        e.preventDefault()
        const amounts = amountErc20.value;
        const direccioni = direccionErc20.value
        
        if(Number(amounts) <= 0){
            alert('valor no permitido')
            return
        }
        if(!web3.utils.isAddress(direccioni)){
            alert('direccion no valida')
            return
        }
        FrtContract.methods.transfer(direccioni,amounts).send({from})
        
    }

    connecButton.onclick = connect;
    send.onsubmit = transact
    sendErc20.onsubmit = transactErc20

}
