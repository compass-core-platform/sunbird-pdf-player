import { Component, OnInit } from '@angular/core';
import { PlayerConfig, Metadata } from '../../projects/sunbird-pdf-player/src/lib/playerInterfaces';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sunbird-pdf-player-app';
  pdfMetaDataConfig: any = JSON.parse(localStorage.getItem('config')) || {};
  config = {
    ...{
      traceId: 'afhjgh',
      sideMenu: {
        showShare: true,
        showDownload: true,
        showReplay: true,
        showExit: true
      }
    }, ...this.pdfMetaDataConfig
  };
  metadata: any = {
    "copyright": "compass",
     "keywords": [
        "cricket",
        "skill",
        "practice"
     ],
     "channel": "0138325860604395527",
     "mimeType": "application/pdf",
     "objectType": "Content",
     "appIcon": "https://storageco.blob.core.windows.net/content-storage/content/do_1139111142120652801218/artifact/do_1139111177289891841219_1698134488590_cricket.thumb.jpg",
     "primaryCategory": "Explanation Content",
     "artifactUrl": "https://storageco.blob.core.windows.net/content-storage/content/assets/do_1139111142120652801218/cricket.pdf",
     "contentType": "Resource",
     "identifier": "do_1139111142120652801218",
     "visibility": "Default",
     "mediaType": "content",
     "osId": "org.ekstep.quiz.app",
     "languageCode": [],
     "license": "CC BY 4.0",
     "name": "Play Cricket",
     "status": "Live",
     "code": "37c19709-38e5-4744-9dc8-4dcd02c12d86",
     "streamingUrl": "https://storageco.blob.core.windows.net/content-storage/content/assets/do_1139111142120652801218/cricket.pdf",
     "createdOn": "2023-10-24T07:54:19.096+0000",
     "copyrightYear": 2023,
     "lastUpdatedOn": "2023-10-24T08:02:58.551+0000",
     "creator": "CompassCreator",
     "pkgVersion": 1,
     "versionKey": "1698134506475",
     "framework": "fracing_fw",
     "createdBy": "1fc08c1b-39bb-4b53-a25d-12bf9ef99e4f",
     "resourceType": "Learn",
     "licenseDetails": {
        "name": "CC BY 4.0",
        "description": "CC BY 4.0"
     },
     "currentAttempt": 0
  };
  pdfMetadataEvents: object;
  pdfPlayerConfig: PlayerConfig = {
    context: {
      channel: '505c7c48ac6dc1edc9b08f21db5a571d',
      pdata: { id: 'prod.diksha.portal', ver: '3.2.12', pid: 'sunbird-portal' },
      dispatcher: {
        dispatch(event) {
          console.log(`Events from dispatcher: ${JSON.stringify(event)}`);
        }
      }
    },
    config: this.config,
    metadata: this.metadata
  };

  ngOnInit(): void {
    this.pdfPlayerConfig.config.pagesVisited = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,22];
    console.log("pdfPlayerConfig", this.pdfPlayerConfig)
  }



  pdfEventHandler(event) {

    console.log(JSON.stringify(event));
    this.pdfMetadataEvents = event;
    if (event.eid === 'END') {
      this.pdfMetaDataConfig = event.metaData;
      localStorage.setItem('config', JSON.stringify(this.pdfMetaDataConfig));
      this.pdfMetaDataConfig = JSON.parse(localStorage.getItem('config')) || {};
      this.config = {
        ...{
          traceId: 'afhjgh',
          sideMenu: {
            showShare: true,
            showDownload: true,
            showReplay: true,
            showExit: true
          }
        }, ...this.pdfMetaDataConfig
      };
      this.pdfPlayerConfig.config = this.config;
    }

    if (event?.edata?.type === 'PRINT') {
      const windowFrame = window.document.querySelector('pdf-viewer iframe');
      if (windowFrame) {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        windowFrame['contentWindow'].print();
      }
    }
  }
  telemetryEvent(event) {
    console.log('in app: ', JSON.stringify(event));
  }

}
