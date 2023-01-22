import {PythonShell} from 'python-shell';

export const getTracker = async (req, res) => {

    const options = {
        mode: 'text',
        pythonPath: 'C:\\python310\\python',
        pythonOptions: ['-u'],
      scriptPath: 'C:\\Users\\zfq11\\dev\\conuhack-vii\\Data_Analyse',
      args: ['86400']
    };
    
    PythonShell.run('main.py', options, function (err, results) {
      if (err) throw err;
      // results is an array consisting of messages collected during execution
      console.log('results: %j', results);
    });
    console.log('finish')
};
