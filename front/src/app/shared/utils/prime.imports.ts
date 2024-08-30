import { ChipsModule } from 'primeng/chips';
import { SharedModule, Header, Footer } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Dialog, DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { FocusTrapModule } from 'primeng/focustrap';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { TabMenuModule } from 'primeng/tabmenu';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { FieldsetModule } from 'primeng/fieldset';
import { TimelineModule } from 'primeng/timeline';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PasswordModule } from 'primeng/password';

export const APP_PRIMENG_MODULE = [
  ChipsModule,
  SharedModule,
  TableModule,
  DialogModule,
  ConfirmDialogModule,
  DropdownModule,
  MenubarModule,
  ButtonModule,
  ListboxModule,
  RadioButtonModule,
  PanelModule,
  AccordionModule,
  CalendarModule,
  TabViewModule,
  FocusTrapModule,
  CheckboxModule,
  TreeTableModule,
  TreeModule,
  InputTextModule,
  CardModule,
  ToolbarModule,
  SplitButtonModule,
  AvatarModule,
  ImageModule,
  BreadcrumbModule,
  MultiSelectModule,
  TagModule,
  TabMenuModule,
  SidebarModule,
  MenuModule,
  ToastModule,
  MessagesModule,
  FieldsetModule,
  TimelineModule,
  InputSwitchModule,
  SelectButtonModule,
  InputTextareaModule,
  FileUploadModule,
  ProgressSpinnerModule,
  DynamicDialogModule,
  PasswordModule,
];

export const APP_PRIMENG_COMPONENTS = [Dialog, ConfirmDialog, Header, Footer];

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

export const APP_PRIMENG_PROVIDERS = [ConfirmationService, MessageService, DialogService];
