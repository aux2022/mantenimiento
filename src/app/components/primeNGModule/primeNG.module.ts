import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';

// PrimeNg
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BadgeModule } from 'primeng/badge';//1
import { InputSwitchModule } from 'primeng/inputswitch';//2
import {ChartModule} from 'primeng/chart';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import {TooltipModule} from 'primeng/tooltip';
@NgModule({
    exports: [
    FieldsetModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
    MenuModule,
    PasswordModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    RippleModule,
    MenubarModule,
    BreadcrumbModule,
    CardModule,
    SidebarModule,
    CheckboxModule,
		RadioButtonModule,
    ToggleButtonModule,
    InputTextareaModule,
    DataViewModule,
    AutoCompleteModule,
    RatingModule,
    TabViewModule,
    ConfirmPopupModule,
    ToolbarModule,
    ConfirmDialogModule,
    MessagesModule,
    BadgeModule,
    InputSwitchModule,
    ChartModule,
    ProgressBarModule,
    DynamicDialogModule,
    TooltipModule

    ],
})
export class PrimeNgModule { }
