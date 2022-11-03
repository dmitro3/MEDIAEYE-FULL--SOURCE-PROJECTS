import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session"
import * as passport from "passport"
import { JWT_SECRET_KEY } from './common/config';
import { json } from 'body-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = {
    origin: true,
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  }
  app.enableCors(options);
  app.use(
    session({
      secret: JWT_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(json({limit: '50mb'}));
  await app.listen(3001);
}
bootstrap();
