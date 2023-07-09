import { Component, ElementRef, ViewChild } from '@angular/core';
import { FilesService } from 'src/app/files/services/files.service';
@Component({
  selector: 'app-upload-file-expirement',
  templateUrl: './upload-file-expirement.component.html',
  styleUrls: ['./upload-file-expirement.component.scss']
})
export class UploadFileExpirementComponent {
  constructor(private filesService: FilesService){}

  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  onSubmit() {
    const im = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', im);
    this.filesService.uploadFile(file).subscribe((res) => console.log(res));
  }
}
