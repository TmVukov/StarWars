import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-droid',
  templateUrl: './droid.component.html',
  styleUrls: ['./droid.component.scss'],
})
export class DroidComponent implements OnInit {
  public safeUrl: SafeUrl;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.sanitizeVideo();
  }

  private sanitizeVideo(): void {
    const videoUrl = 'https://www.youtube.com/embed/buJjccK98FQ';

    this.safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
}
