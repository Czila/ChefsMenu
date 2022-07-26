module.exports = {
    formValidateMAil : (mail) => {
        const emailVerif = RegExp(
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
          );
        return emailVerif.test(mail)
        },
    formValidateInfo : (infos) => {
        let good=true
        infos.filter((info) => {

            if (info === undefined){
            good=false
            }else if (info.length <= 0) good=false 
        })
        return good
    },
    formValidatePass : (mdp) => {
        const passVerif = RegExp(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/
          );
        return passVerif.test(mdp)
    },
    formCP : (mdp) => {
        const cpVerif = RegExp(
            /^(([0-8][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$$/
          );
        return cpVerif.test(mdp)
    }
}

      