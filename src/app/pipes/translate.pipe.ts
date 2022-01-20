import {Pipe, PipeTransform} from '@angular/core';
import {TranslationService} from "../services/translation/translation.service";

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private translationService: TranslationService) {
  }

  transform(alertCode: string): string {
    const foundedTranslation = this.translationService.translations.find(translation => translation.alertCode == alertCode);
    if (foundedTranslation) {
      return foundedTranslation.alertName;
    } else {
      return '';
    }
  }

}
