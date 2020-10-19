import passport from 'passport'
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'
import { User } from '../models'

const strategies = () => {
    // Local Strategy
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        async (email, password, done) => {
            const user = await User.findOne({ where: { email: email } })
            if (!user) { // no such user
                return done(null, false)
            }

            const isPasswordCorrect = await User.prototype.comparePassword(password, user.get('password'))
            if (!isPasswordCorrect) {
                return done(null, false)
            }

            const responseUser = {
                "nickname": user.get('nickname'),
                "email": user.get('email'),
            }

            return done(null, responseUser);
        }
    ));

    //JWT Strategy
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || 'default'
    },
        async (jwtPayload, done) => {

            const user = await User.findOne({ where: { email: jwtPayload.email } })
            if (!user) { // no such user
                return done(null, false)
            }

            const responseUser = {
                "nickname": user.get('nickname'),
                "email": user.get('email'),
            }

            return done(null, responseUser);
        }
    ));
}

export default strategies