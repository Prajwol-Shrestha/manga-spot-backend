import { Injectable } from '@nestjs/common';
import { AxiosHttpService } from 'src/common/http/axios-http.service';
import { ENDPOINTS } from 'src/constants/endpoints';
import { modifyTag } from 'src/utils/tag-utils';

@Injectable()
export class TagsService {
  constructor(private httpService: AxiosHttpService) {}

  async getAllTags() {
    try {
        const result = await this.httpService.get(ENDPOINTS.getMangaTagList);
        const mappedTags = new Map()

        const tags = result?.data || []
        tags.forEach(tag => {
            const key = tag.attributes.group
            const transformedTag = modifyTag(tag)
           if(mappedTags.has(key)) {
               mappedTags.get(key).push(transformedTag)
           } else {
               mappedTags.set(key, [transformedTag])
           }
        })
        
        const finalResponse = {
            ...result,
            data: Object.fromEntries(mappedTags)
        }
        
      return finalResponse;
    } catch (err) {
      console.log(err);
      throw Error(err);
    }
  }
}
