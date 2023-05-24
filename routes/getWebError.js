const router = require('express').Router()
const pa11y = require('pa11y')

router.get('/', async (req, res) => {
    try {
        if (!req.query.url) {
            res.status(400).json({error:'url is required'})
        }
        if (!req.query.standerd) {
            res.status(400).json({error:'Standerd is requird'})
        }
        else {
            const results = await pa11y(req.query.url, {
                standard: req.query.standerd,
                runners: ['htmlcs'],
                
                includeWarnings: true,
                includeNotices:true,
                
                
            })
            
            //This need to be uncomment section
            const warning = []
            const error = []
            const notice=[]
            results?.issues.forEach(element => {
                if (element.type === "warning") {
                    
                    warning.push(element)
                }
                if (element.type === 'error') {
                    error.push(element)
                }
                if (element.type === "notice") {
                    notice.push(element)
                }
            });
            
            // const errorResults = await pa11y(req.query.url, {
            //     standard: "WCAG2AA",
            //     runners: ['htmlcs'],
                
            // })
            // const WarningResults = await pa11y(req.query.url, {
            //     standard: "WCAG2AA",
            //     runners: ['htmlcs'],
            //     includeWarnings:true
                
            // })
            //This need to be uncomment section
            res.status(200).json({name:results?.documentTitle,address:results?.pageUrl,error:error,warning:warning,notice:notice})
            //res.status(200).json(results)
        }
    }
    catch (er) {
        res.status(500).json(er)
    }
})

module.exports = router