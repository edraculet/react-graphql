import React, {Component} from 'react'
import UserTable from './UserTable'

import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiTitle,
} from '@elastic/eui';

require("@elastic/eui/dist/eui_theme_light.css");

class App extends Component {
    render() {
        return (
            <EuiPage>
                <EuiPageBody>
                    <EuiPageHeader>
                        <EuiPageHeaderSection>
                            <EuiTitle size="l">
                                <h1>Users List</h1>
                            </EuiTitle>
                        </EuiPageHeaderSection>
                        <EuiPageHeaderSection>Loaded using fake data</EuiPageHeaderSection>
                    </EuiPageHeader>
                    <EuiPageContent>
                        <UserTable/>
                    </EuiPageContent>
                </EuiPageBody>
            </EuiPage>
        )
    }
}
export default App;

