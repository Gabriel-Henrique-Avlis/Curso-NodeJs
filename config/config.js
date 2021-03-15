const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env){
        case 'dev':
            return{
                bd_string: 'mongodb+srv://usuario_admin:JG5UYxrbfKIocLeN@cluster0.1xxzz.mongodb.net/test?retryWrites=true',
                jwt_pass: 'JG5UYxrbfKIocLeN',
                jwt_expires_in: '7d'
            }

        case 'hml':
            return{
                bd_string: 'mongodb+srv://usuario_admin:JG5UYxrbfKIocLeN@cluster0.1xxzz.mongodb.net/test?retryWrites=true',
                jwt_pass: 'JG5UYxrbfKIocLeN',
                jwt_expires_in: '7d'
            }

        case 'prod':
            return{
                bd_string: 'mongodb+srv://usuario_admin:JG5UYxrbfKIocLeN@cluster0.1xxzz.mongodb.net/test?retryWrites=true',
                jwt_pass: 'JG5UYxrbfKIocLeN',
                jwt_expires_in: '7d'
            }
        }
    }

    module.exports = config();