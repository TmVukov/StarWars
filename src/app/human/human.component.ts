import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-human',
  templateUrl: './human.component.html',
  styleUrls: ['./human.component.scss'],
})
export class HumanComponent implements OnInit {
  public safeUrl: SafeUrl;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.sanitizeVideo();
  }

  private sanitizeVideo(): void {
    const videoUrl = 'https://www.youtube.com/embed/dOSzCHmP1xM';

    this.safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
}
