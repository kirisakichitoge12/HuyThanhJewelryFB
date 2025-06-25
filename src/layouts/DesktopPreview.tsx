import React from 'react'
import { WidgetData } from '../types/widget.interface';
import Each from './Each';
import WidgetRenderer from '../components/WidgetRender';

interface Props{
    data: WidgetData[];
    fontTitleFamily?: string;
    fontContentFamily?: string;
}

const DesktopPreview: React.FC<Props> = ({
    data,
    fontTitleFamily,
    fontContentFamily,
}) => {
    return (
        <div className='relative snap-y snap-mandatory overflow-y-auto max-h-screen overflow-x-hidden'>
            <Each 
                of={data}
                render={(widget: WidgetData) => 
                    <div className="w-full h-screen">
                        <WidgetRenderer 
                            data={widget} 
                            fontTitleFamily={fontTitleFamily}
                            fontContentFamily={fontContentFamily}
                            size="full"
                        />
                    </div>
                }
            
            />
        </div>
    )
}

export default DesktopPreview