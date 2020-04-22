import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ChatPage} from './chat';
import {MomentModule} from 'angular2-moment';
import {TranslaterModule} from '../../app/translate.module';
import { Ng2ImgMaxModule } from 'ng2-img-max';

@NgModule({
    declarations: [
        ChatPage,
    ],
    imports: [
        Ng2ImgMaxModule,
        IonicPageModule.forChild(ChatPage),
        MomentModule,
        TranslaterModule
    ],
    exports: [
        ChatPage
    ]
})
export class ChatPageModule {
}
