using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

using Windows.Networking.Connectivity;
using System.Threading.Tasks;

namespace MakeArt
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class Offline : Page
    {
        private NetworkStatusChangedEventHandler NetworkStatusCallback;
        private Uri CurrentUri;
        public Offline()
        {
            this.InitializeComponent();
            NetworkStatusCallback = new NetworkStatusChangedEventHandler(OnNetworkStatusChange);
            NetworkInformation.NetworkStatusChanged += NetworkStatusCallback;
        }
        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            try {
                CurrentUri = new Uri(e.Parameter as string);
            } catch (Exception ex) { }
        }
        async void OnNetworkStatusChange(object sender)
        {
            // get the ConnectionProfile that is currently used to connect to the Internet                
            ConnectionProfile InternetConnectionProfile = NetworkInformation.GetInternetConnectionProfile();

            if (InternetConnectionProfile != null) {
                await Refresh();
            }
        }

        private async void CheckConnection_Click(object sender, RoutedEventArgs e)
        {
            bool result = await Windows.System.Launcher.LaunchUriAsync(new Uri("ms-settings:network"));
        }

        private async void Refresh_Click(object sender, RoutedEventArgs e)
        {
            await Refresh();
        }
        private async Task Refresh()
        {
            await Windows.ApplicationModel.Core.CoreApplication.MainView.CoreWindow.Dispatcher.RunAsync(Windows.UI.Core.CoreDispatcherPriority.Normal,
                () =>
                {
                    this.Frame.Navigate(typeof(MainPage), CurrentUri.ToString());
                });
        }
    }
}
