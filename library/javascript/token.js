function prepareToken(tid){
    let token = MapTool.tokens.getTokenByID(tid);
    token.setProperty("ether.gurps4e.ST",'10');
    token.setProperty("ether.gurps4e.IQ",'10');
    token.setProperty("ether.gurps4e.HT",'10');
    token.setProperty("ether.gurps4e.DX",'10');
    token.setProperty("ether.gurps4e.BL",'20');
    token.setProperty("ether.gurps4e.Will",'10');
    token.setProperty("ether.gurps4e.Per",'10');
    token.setProperty("ether.gurps4e.HP",'10');
    token.setProperty("ether.gurps4e.FP",'10');
    token.setProperty("ether.gurps4e.cHP",'10');
    token.setProperty("ether.gurps4e.cFP",'10');
    token.setProperty("ether.gurps4e.sense.vision",'10');
    token.setProperty("ether.gurps4e.sense.hearing",'10');
    token.setProperty("ether.gurps4e.sense.taste",'10');
    token.setProperty("ether.gurps4e.sense.smell",'10');
    token.setProperty("ether.gurps4e.dice.dmg_sw",'1d6');
    token.setProperty("ether,gurps4e.dice.dm_thr",'1d6-2');
}
export{ prepareToken};
